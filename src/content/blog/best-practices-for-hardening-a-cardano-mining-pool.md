---
title: 'Best practices for hardening a Cardano mining pool'
date: '2021-06-18 18:55'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript","linux","git","ssh","ansible","motorcycle","music"]
thumbnail: '/images/thumbnails/haskell.png'
status: 'published'
---

I was asked to come up with and advice regarding hardening a Cardano mining pool. As this is a bit out of my comfort
zone I decided to document my journey and do some research into best practices. It might help others and I am very
open to discussions about some of the choices and for other practices that can be utilized to keep it as secure as
possible.

Note: Running the cardano pool on a kubernetes cluster, with enough resources, could also work; but for this blog I
assume an architecture consisting out of several VPS servers to keep the complexity as low as possible for the time
being.

After reading a bit in the docs a mining pool seems te consist out of a couple of high available servers that will run
the cardano-node software + an offline/airgapped server + one or more relay nodes. So at least 4 servers that need to
be configured and maintained. The relay nodes seem to be quite essential in providing and extra layer of security.

> Relay nodes do not have any keys, so they cannot produce blocks. Instead, relays act as proxies between the core
network nodes and the internet, establishing a security perimeter around the core, block-producing network nodes.
Since external nodes cannot communicate with block-producing nodes directly, relay nodes ensure that the integrity
of the core nodes and the blockchain remains intact, even if one or more relays become compromised.

Security hardening for Cardano stake pools is not merely about simply following a guide once and you are done with
it. Security hardening is one of the pool operators main tasks in order to achieve a solid uptime.

## Organisational countermeasures and rules

With fully hardened and updated servers there can be other threats, like social engineering, weak passwords, key
logging, rootkits, malware, ransom etc. To mitigate these kinds of risks a vision + a set of security rules are needed.

- Use 2FA everywhere, preferably without SMS (Google Authenticator or Yubikey)
- Run some sort of malware/ransomware scan
- No re-used passwords in the context of the pool
- No secrets, passes or creds in git hub repo's
- A formal on and off-boarding protocol for admins
- Ransomware proof backup
- No single point of failure in the members of the admin group

As a stake pool involves  managing a couple of servers with almost the same specs I would advise to use some sort of
provisioning tools. Ansible would be really good for managing the ubuntu deps and general config needs of the servers.
That also makes it easy do stuff on all the nodes or to quickly deploy an extra relay or block producing node.

## Hardening the servers itself

Linux is well-known for being one of the most secure operating systems available. But that doesn't mean you can
count on it to be as secure as possible right out of the box. There are a some quick, easy steps you can take to
ensure your platform is even more secure.

### Secure Shared Memory
One of the first things you should do is secure the shared memory used on the system. If you're unaware, shared memory
can be used in an attack against a running service. Because of this, secure that portion of system memory. You can
do this by modifying the `/etc/fstab` file.

Add the following line to the bottom of that file:

```fstab
tmpfs /run/shm tmpfs defaults,noexec,nosuid 0 0
```

For the changes to take effect, reboot the server.

### Enable SSH Login for Specific Users Only
Although SSH is fairly secure by default, you can make it more secure by enabling SSH login only for specific users
and / or by only allowing it from known IP's. You can do this by modifying `/etc/ssh/sshd_config`. Add the allowed
users at the bottom.

```conf
AllowUsers admin@145.145.1.1
```

You can wild card stuff here so, to allow all users in `192.168.1.0/24` access:

```
AllowUsers *@192.168.1.*
```

### Include a Security Login Banner
Adding a security login banner might not seem like the most effective security measure, it has benefits. For example,
if an unwanted user gains access to your server, and if they see that you included specific information in a login
banner (warning them of the consequences of their actions), they might think twice about continuing.

Edit `/etc/issue.net` to your likings. Now disable the MOTD by editing: `/etc/pam.d/sshd`

Comment the 2 lines:
```conf
session optional pam_motd.so motd=/run/motd.dynamic
session optional pam_motd.so noupdate
```

Uncomment this line in `/etc/ssh/sshd_config`:
```conf
Banner /etc/issue.net
```

Restart SSHD to inspect the changes:

```bash
sudo systemctl restart sshd
```

### Restrict SU Access

Unless configured otherwise, Linux users can use the su command to change to a different user. When they do that,
they gain the privileges granted to that other user. So if user A (who has limited access to the server) uses su to
change to user B (who has less limited access to the server), user A is now user B and can do more to the server.
Because of this, disable access to the su command.

Create a new group:

```bash
sudo groupadd admin
```

Add users to this group, for example, to add user admin to the group. The command for this is:

```bash
sudo usermod -a -G admin admin
```

Grant access to `su` for the added group:

```bash
sudo dpkg-statoverride --update --add root admin 4750 /bin/su
```

### Make brute password attempts hard

You could install fail2ban or a set of firewall rules to ensure that multiple attempts with wrong passwords or SSH keys
get you blocked permanently or for a while.

You can add this to an ansible playbook to load a firewall that blocks SSH access after a couple of wrong attempts:

```yaml
- hosts: nodes
  become: yes
  become_method: sudo
  tasks:
  - name: Reset FW
    ufw:
      state: reset
  - name: Limit SSH access after unsuccesful login attempts
    ufw:
      rule: limit
      port: ssh
      proto: tcp
  - name: Enable FW
    ufw:
      state: enabled
```

## DOS and DDOS mitigation

Firewalling:

1. the firewall on the block-producing node's servers should be configured to only allow incoming connections from its
relays. If a relay node becomes compromised, you can simply switch it off and use a different one.

2. Todo: Investigate if dynamic protocols are used; e.g. can other outgoing traffic that not originates from the
pool and protocols itself be blocked?

3. Probably good to add some sort of software firewalling in addition to a hardware firewall if possible

On the servers with internet administrators use ssh accessible CLI tools for operations on the pool.

> Here my journey ends for now. Did I forget stuff? Probably. Feel free to comment.

*Update November 2021:*
I've fiddled around with Ansible and can now automate most of the tasks in the cluster. Including upgrading the node.
If there is need for such docs from the Cardano community I would be happy to write a blog post on that. I found quite
some abandoned Ansible attempts so it might be not the best tool for the job. I am also interested in experiences with
running it on kubernetes. Happy mining. 🚀

Reading material used:

[Stake operator best practices](https://www.coincashew.com/coins/overview-ada/guide-how-to-build-a-haskell-stakepool-node#18-15-stake-pool-operators-best-practices-checklist)

[Official stake pool course](https://cardano-foundation.gitbook.io/stake-pool-course/)

[For fun: hardening-cardano-against-quantum-computers](https://iohk.io/en/blog/posts/2018/02/01/research-program-to-work-on-hardening-cardano-against-quantum-computers/)

[Hardening ubuntu 18.04](https://www.lifewire.com/harden-ubuntu-server-security-4178243)

[Practical hardening guide (CentOS)](https://github.com/trimstray/the-practical-linux-hardening-guide)

[Terrafrom template for HA cardano setup on AWS](https://github.com/osodevops/aws-terraform-module-cardano-stake-pool)
