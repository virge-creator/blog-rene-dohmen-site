---
title: 'Setup Django to use Graylog logging'
date: '2018-01-19 15:46'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","javascript","linux","docker","devops"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

I'm quite a big fan of Sentry logging, especially for Django project,
but for a project I needed to setup Graylog logging as it was already
available in the infra structure.

Python has an excellent logging system and Django uses it since Django
1.3. To use it in views, models and tasks you add an import on top of
the file:

``` {.python}

# Get an instance of a logger
logger = logging.getLogger(__name__)  # pylint: disable=C0103
```

Then you can use it everywhere in that python file with:

``` {.python}
logger.debug('A debug message')
logger.info('An info message')
logger.warning('An info message')
logger.error('An error message')
logger.critical('An error message')
```

Inside an exception you can use "exception" logger to attach stack
trace:

``` {.python}
try:
    1/0
except Exception:
    logger.exception("An exception occurred")
```

Vision
======

First a brief note about the vision behind logging.

Where to Log
------------

Your app should not be concerned with where its logs go. Instead, it
should log everything to the console (stdout/stderr) and let the
production environment decide what to do with it from there. Typically
this is put in a dedicated (and logrotated) file, captured by the
Systemd journal or Docker, sent to a separate service such as
ElasticSearch, Kibana, Logstash, or some combination of those.

Rule of thumb: *Log storage is a deployment concern, not an application
concern.*

Log format
----------

Your app does needs to concern itself with the format of the logs.
Typically this is just a string with the relevant data, but if your
server already adds a timestamp to the log, you probably want to exclude
it from your own formatter. Likewise, if your log aggregator accepts
JSON, a formatter like python-json-logger will be more appropriate.

Django conf
===========

By default Django does setup it's production logging to mail errors to
admins. This can be a nice feature for small sites as it alerts people
when things go wrong. For larger sites it get annoying quite fast. An
error on a heavy loaded site can easily spawn thousands of mails in a
couple of seconds. As the default behaviour is quite difficult to change
I normally rewrite the complete logging so I can benefit from other
things as well:

-   disable logging for noisy modules like new relic
-   differentiated log levels for specific Django apps in your stacks
-   log levels that can be tweaked from env variables
-   fine grained control of modules that log stuff

So here we go, the following config can be used as a starting point:

``` {.python}

ENVIRONMENT = 'production'  # Load this from os.getenv() in your setup
LOGGING_CONFIG = None
logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            # exact format is not important, this is the minimum information
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
        },
    },
    'filters': {
        'static_fields': {
            '()': 'conf.logfilters.StaticFieldFilter',
            'fields': {
                'project': 'your_project_name',
                'environment': '%s' % ENVIRONMENT,
            },
        },
        'django_exc': {
            '()': 'conf.logfilters.RequestFilter',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console',
        },
        'graypy': {
            'class': 'graypy.GELFHandler',
            'host': 'GRAYLOG_HOST',
            'port': 123456,
            'filters': ['static_fields', 'django_exc'],
        },
    },
    'loggers': {
        # root logger
        '': {
            'level': 'INFO',
            'handlers': ['console', 'graypy'],
        },
        'your_project_name': {
            'level': 'DEBUG',  # Load this from os.getenv() in your setup
            'handlers': ['console', 'graypy'],
            # required to avoid double logging with root logger
            'propagate': False,
        },
    },
})
```

Tweaking the noise level is quite easy: imagine you have a lot
irrelevant logging from "noisy_module"

Add this to your loggers, below the "your_project_name" logger:

``` {.python}
'noisy_module': {
    'level':'ERROR',
    'handlers': ['console'],
    'propagate': False,
},
```

Now only errors are logged to console. If you don't want to see it all:

``` {.python}
'noisy_module': {
    'level':'NOLOGS',  # just choose a non existing log level
    'propagate': False,
},
```

If you need the default requests logging again:

``` {.python}
from django.utils.log import DEFAULT_LOGGING
logging.config.dictConfig({
    # ...
    'formatters': {
        # ...
        'django.server': DEFAULT_LOGGING['formatters']['django.server'],
    },
    'handlers': {
        # ...
        'django.server': DEFAULT_LOGGING['handlers']['django.server'],
    },
    'loggers': {
        # ...
        'django.server': DEFAULT_LOGGING['loggers']['django.server'],
    },
})
```

Happy logging!
