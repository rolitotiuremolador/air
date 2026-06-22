import os

# Set this via the terminal/OS: export DJANGO_ENV='dev'
env = os.environ.get('DJANGO_ENV', 'dev')

if env == 'prod':
    from config.settings.prod import *
else:
    from config.settings.dev import *