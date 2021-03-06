# deployment/production settings

import os
from portfolio.settings import *
from portfolio.settings_environ import *


DEBUG = False
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'afternoon-hollows-18869.herokuapp.com',
    'afternoon-hollows-18869-pr-2.herokuapp.com',
    'afternoon-hollows-18869-pr-3.herokuapp.com',
    'afternoon-hollows-18869-pr-4.herokuapp.com',
    'afternoon-hollows-18869-pr-5.herokuapp.com',
    'afternoon-hollows-18869-pr-6.herokuapp.com',
    'joshuadanielcodes.com',
    'www.joshuadanielcodes.com',
]

# Media File Storage on Amazon S3
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
# STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
DEFAULT_FILE_STORAGE = 'portfolio.storage_backends.MediaStorage'
MEDIA_ROOT = 'https://s3.us-east-2.amazonaws.com/' + AWS_STORAGE_BUCKET_NAME
MEDIA_URL = MEDIA_ROOT + '/assets/'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}

# Change 'default' database configuration with $DATABASE_URL.
DATABASES['default'].update(dj_database_url.config(conn_max_age=500))
