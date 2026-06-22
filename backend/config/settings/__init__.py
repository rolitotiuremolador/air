import os
env = os.environ.get('DJANGO_ENV', 'dev')

if env == 'prod':
    from config.settings.prod import *
else:
    from config.settings.dev import *