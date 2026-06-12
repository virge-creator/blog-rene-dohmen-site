---
title: 'OpenTofu on AWS: Cognito, ElastiCache and ECS Without the Drama'
date: '2026-06-12 14:00'
author: 'acidjunk'
category: ['Computerz']
tags: ["Computerz","devops","aws","opentofu","terraform","docker","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1722635940350-d1b2e5129379?w=800'
status: 'published'
---

Yes, the header image is actual tofu. Blocks, neatly stacked, ready to be composed into something bigger. That's the whole pitch really.

You know the failure mode with infrastructure: it gets built once, by hand, in the AWS console, by someone who left the company. Two years later nobody dares to touch the security groups and the staging environment is "sort of like production, we think". Infrastructure as code fixes that, and since the Terraform license drama, [OpenTofu](https://opentofu.org/) is the fork I reach for. Same HCL, same providers, same muscle memory, but actually open source. You type `tofu` instead of `terraform` and that's about it.

This post is the setup I run a real project on: **Cognito** for auth, **ElastiCache** for Redis (well, Valkey), and **ECS Fargate** for the containers. Plus the part most tutorials skip: how you update the thing every day without crying.

## The repo layout

One infra repo, environments as directories, everything reusable as a module:

```
infra/
├── envs/
│   ├── staging/        # one tofu root per environment
│   ├── production/
│   └── common/         # shared stuff: VPC config, variables
├── modules/
│   ├── cognito/
│   ├── valkey_cache/
│   ├── ecs_web_app/
│   ├── database/
│   └── ...
└── scripts/            # deploy helpers, image push scripts
```

No workspaces. Workspaces look elegant until you `tofu apply` production while you *thought* you were in staging. A directory per environment means your shell prompt tells you where you are, and each environment gets its own state, its own tfvars, its own blast radius.

## State: S3 + DynamoDB, per environment

The first thing you create (by hand, it's a chicken-and-egg thing) is a state bucket and a lock table per environment:

```hcl
terraform {
  required_version = ">= 1.3.9"

  backend "s3" {
    bucket         = "tf-state-myproject-staging-<account_id>"
    dynamodb_table = "terraform-lock-myproject-staging-<account_id>"
    region         = "eu-central-1"
    key            = "state/terraform.tfstate"
    encrypt        = true
  }
}
```

The account ID in the bucket name is not decoration: S3 bucket names are global, and this guarantees staging state can never collide with production state, even across AWS accounts. Some people like to add extra random chars as it can be expensive when people know the name of a s3 bucket. The DynamoDB table gives you locking, so two people running `apply` at the same time get a polite error instead of corrupted state.

## Secrets at apply time

Secrets do not live in `terraform.tfvars` files that get passed around in Slack. They live in 1Password, and the `op` CLI injects them when you run tofu:

```bash
op run --env-file=.env -- tofu apply
```

The `.env` file contains 1Password *references* (not values), is safe-ish to commit, and the actual secrets only exist in memory during the apply. Inside AWS the same secrets land in **SSM Parameter Store as SecureString**, and ECS injects them into containers at startup. Your app reads environment variables, nobody ever sees a password in a task definition or a git diff.

## Cognito: three clients, three jobs

Cognito has a reputation for being confusing and honestly, it earns it. The thing that made it click for me: you almost always need **three different clients** on one user pool, because there are three different kinds of "logging in".

```hcl
resource "aws_cognito_user_pool" "main" {
  name = "myproject_user_pool_${var.environment}"

  alias_attributes         = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
  }
}
```

**1. The end-user client.** Browser login, OAuth `code` flow, refresh tokens. Access and ID tokens valid for an hour, refresh token for 30 days. This is what your frontend talks to, via the hosted UI on `myproject-staging.auth.eu-central-1.amazoncognito.com` (you can theme it with CSS and a logo, it'll never win design awards, but it works).

**2. The machine-to-machine client.** Backend services talking to each other don't have a browser and don't have a password. They use the `client_credentials` flow against a Cognito **resource server** with a custom scope:

```hcl
resource "aws_cognito_resource_server" "api" {
  identifier = "myproject-${var.environment}"
  name       = "API access"

  scope {
    scope_name        = "api"
    scope_description = "Full API access for services"
  }
}
```

Service A posts its client ID + secret to the token endpoint, gets a JWT with scope `myproject-staging/api`, service B validates it. No users involved, no sessions, just signed tokens.

**3. Optional social login.** Google SSO is a conditional `aws_cognito_identity_provider` (only created when a `google_client_id` variable is set), with attribute mapping for email and name. Tofu outputs the exact redirect URI you need to paste into the Google Cloud Console, because you *will* get that URL wrong by hand.

Mark the client secrets as `sensitive = true` in your outputs and pull them with `tofu output -raw` when you need them. They never have to touch a file.

## ElastiCache: it's Valkey now

After the Redis license change (everyone's relicensing these days, see also: why this post says tofu), AWS pushes [Valkey](https://valkey.io/), the open source Redis fork. Same protocol, same clients, cheaper on AWS. Use a replication group even for a single node, it makes turning on Multi-AZ later a variable flip instead of a rebuild:

```hcl
resource "aws_elasticache_replication_group" "cache" {
  replication_group_id = "${var.environment}-valkey"
  engine               = "valkey"
  engine_version       = "8.0"
  node_type            = "cache.t4g.micro"
  port                 = 6379

  num_cache_clusters         = var.multi_az ? 2 : 1
  automatic_failover_enabled = var.multi_az
  multi_az_enabled           = var.multi_az

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  subnet_group_name  = aws_elasticache_subnet_group.cache.name
  security_group_ids = [aws_security_group.cache.id]
}
```

Three things that bite people:

- **Transit encryption means `rediss://`, double s.** Output the full URI from the module so apps can't get it wrong: `rediss://${primary_endpoint}:6379/0`. A plain `redis://` connection to a TLS-enabled cluster just hangs, with zero useful error output.
- **The subnet group wants subnets in at least 2 AZs**, even for a single node. Tiny /28 private subnets are fine, a cache doesn't need many IPs.
- **Lock the security group down by source SG, not by CIDR.** Ingress on 6379 only from the security groups of the services that actually need cache access. Output the cache's SG ID from the module so consuming services can add themselves.

Staging runs a single `cache.t4g.micro` (a few euro per month). Production flips `multi_az = true` and gets automatic failover. Same module, one variable.

## ECS: Fargate, one cluster, one load balancer

Containers run on **Fargate** (nobody wants to patch EC2 hosts in 2026). The pattern that keeps the bill sane: **one shared ECS cluster with one ALB**, and multiple services routed by hostname. An ALB is roughly $20/month before traffic, so one-ALB-per-service is how small projects quietly burn money.

The newer AWS provider versions (6.23+) ship `aws_ecs_express_gateway_service`, a high-level wrapper that creates the service, target group, listener rules and autoscaling in one resource. Less HCL to maintain, and blue/green deploys come for free. A web app module boils down to:

- an **ECR repo** with a lifecycle policy that keeps only the last 5 images (ECR storage grows forever otherwise, set this on day one)
- a **task definition**: CPU/memory, plain env vars as a map, secrets as SSM parameter ARNs
- **three IAM roles**: an execution role (pulls images, reads SSM secrets), a task role (what your *app* may do: logs, S3), and an infrastructure role for the gateway service. Keep them separate, your app does not need permission to read its own secrets store.
- **autoscaling on requests per target**: min 1, max 10 tasks, scale when a task handles more than ~100 concurrent requests
- a **health check path** like `/v1/health`, because the default `/` will mark your API unhealthy the moment it returns a 404 on root

One honest gotcha with the express gateway service: it modifies its own network configuration after creation, so without a lifecycle block tofu wants to "fix" it back on every plan:

```hcl
lifecycle {
  ignore_changes = [network_configuration]
}
```

If your plan is never clean, look for a fight like this between the provider and the service. `ignore_changes` is the documented answer, not a hack.

## Updating the deployment (the part you do every day)

You apply infrastructure changes maybe once a week. You deploy app code daily. Those are different workflows and mixing them is misery, so: split them.

**Infra changes** are a Makefile away, from `infra/envs/<env>/`:

```bash
make plan      # op run ... tofu plan
make deploy    # op run ... tofu apply, then exports config
make output    # tofu output
```

The trick is in that "exports config" step. After every apply, a script dumps the deploy-relevant outputs to JSON:

```bash
tofu output -json | jq '{ecr_endpoint, ecr_repository_name, ecs_cluster_name, ecs_service_name}' \
  > scripts/config/staging.json
```

Now **app deploys don't need tofu at all**. Anyone on the team can ship without state access or infra knowledge:

```bash
./scripts/backend-deploy.sh staging
```

Which does, in order:

```bash
# 1. build for the right platform (your Mac is arm64, Fargate here is amd64)
docker buildx build --platform linux/amd64 -t $ECR_ENDPOINT/$REPO:latest .

# 2. login and push
aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_ENDPOINT
docker push $ECR_ENDPOINT/$REPO:latest

# 3. force ECS to roll the service onto the new image
aws ecs update-service --cluster $CLUSTER --service $SERVICE --force-new-deployment

# 4. wait until it's actually healthy (default waiter gives up too early)
AWS_MAX_ATTEMPTS=80 aws ecs wait services-stable --cluster $CLUSTER --services $SERVICE
```

That `--force-new-deployment` is the magic: same task definition, but ECS pulls `:latest` fresh, starts new tasks, waits for ALB health checks, then drains the old ones. Rolling deploy, zero downtime, no task definition surgery. (Purists pin immutable image tags per release. They're right, and when you need rollbacks-by-tag you should too. For a small team shipping daily, `:latest` plus a 5-image ECR history is a fine trade.)

The `buildx --platform linux/amd64` flag in step 1 deserves a highlight: build a plain image on an Apple Silicon Mac and push it, and ECS will crash-loop with an `exec format error` that tells you nothing. Ask me how I know.

## Cheat sheet

The commands I actually type, week in week out:

```bash
# --- session ---
source ./scripts/aws-login.sh            # AWS SSO login, sets AWS_PROFILE
cd infra/envs/staging                    # BE SURE which env you're in

# --- infra ---
make plan                                # review before you wreck
make deploy                              # apply + refresh deploy config
tofu output                              # all outputs
tofu output -raw db_uri                  # one value, no quotes (pipe-friendly)
tofu fmt -recursive                      # before every commit
tofu validate                            # cheap sanity check, also in CI

# --- targeted operations ---
tofu plan -target=module.cache           # plan one module only
tofu state list | grep cognito           # what does tofu know about
tofu taint module.app.null_resource.x    # force recreate one resource
tofu apply -refresh-only                 # sync state with reality, change nothing

# --- app deploys ---
./scripts/backend-deploy.sh staging      # build, push, roll, wait

# --- poking at the result ---
psql "$(tofu output -raw db_uri)"        # straight into the DB
aws logs tail /ecs/staging-backend --follow --since 10m
aws ecs describe-services --cluster $C --services $S \
  --query 'services[0].deployments'      # is a rollout stuck?
```

And the debug flow when a deploy goes sideways: `deployments` shows two entries that never converge → check `aws ecs describe-tasks` for the stop reason → nine times out of ten it's a failing health check or a missing SSM parameter. The logs tail has the rest.

## Ship-check for a new environment

- [ ] State bucket + lock table created, `encrypt = true`, account ID in the name
- [ ] Secrets in SSM SecureString, applied via `op run`, nothing in tfvars
- [ ] Cognito: separate end-user and M2M clients, secrets only via `output -raw`
- [ ] Cache URI is `rediss://` and the app actually connects over TLS
- [ ] ECR lifecycle policy set (last 5 images) before the first push
- [ ] `docker buildx --platform linux/amd64` in the build script, not in someone's memory
- [ ] Health check path points at a real endpoint
- [ ] `make plan` comes back clean on a fresh checkout

None of this is exotic. It's a handful of boring, composable blocks arranged the same way every time, which is exactly why it keeps working. Just like the header image: simple blocks, endless dishes.
