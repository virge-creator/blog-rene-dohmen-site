---
title: 'Generate a type annotated REST api client in python'
date: '2021-05-07 18:55'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","javascript","git"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Today I was tasked with doing some REST API calls against a rather new FastAPI backend at SURF. The nice thing about
FastAPI is that it uses OpenAPI which is a standard that describes the structure of REST requests and responses you
can expect. Previously we were using some tools of Zalando for that; which involved writing rather big YAML files
with the API specs. Other tooling was then used to generate a small backend with empty controllers and a client.
It even works in quite some languages (PHP,Java, Ruby, Python). More info [here](https://github.com/zalando/connexion).

## So what's the problem?
The generated clients are rather bulky and the generated backend for python uses Flask. Since my team, at SURF, migrated
from Flask to FastAPI the openspecs are created direct from FastAPI. FastAPI comes with nice and strict, validated
request and response schemes so it would be nice if the client would mimic that. So say "hi" to: openapi-python-client

You can create a new git repo, make a venv and install it:

```bash
python -m venv venv
source venv/bin/activate
pip install openapi-python-client
```

Now create your client:

```
openapi-python-client generate --url https://BACKEND_URI/api/openapi.json
```

It will generate, type annotated python models for all encountered schemes and a other python module for each endpoint.
Authentication, if correctly specified in the json is also honored, so you can do authenticated calls with a bit of luck
without the to write code yourself.

This works for openapi v3. But what if you have an openapi v2 specification. I fiddled around with:
https://api.improviser.education/swagger.json

```
curl -X GET "https://converter.swagger.io/api/convert?url=https%3A%2F%2Fapi.improviser.education%2Fswagger.json" \
-H "accept: application/json"
```

Which returns
```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "iMproviser API",
    "description": "A restful api for the iMproviser",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "//api.improviser.education/"
    }
  ],
  "tags": [
    {
      "name": "tags",
      "description": "Tag related operations"
    },
    {
      "name": "riffs",
      "description": "Riff related operations"
    }
  ]

...

}
```

So I did run the api generator against it

`openapi-python-client generate --path improviser.json`

> Note: I had to change the name in the downloaded .json to "improviser". Originally it was "iMproviser API" which
generated a very weird client name, something like  `i-improviser-client`

You can see the resulting client in this [repo](https://github.com/acidjunk/improviser-api-client)

An example of what's in the models can be found [here](https://github.com/acidjunk/improviser-api-client/blob/master/improviser-client/improviser_client/models/riff.py)
