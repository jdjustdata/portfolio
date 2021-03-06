import os

# Django Application Secret Key
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# Domain Name
DOMAIN_NAME = "joshuadanielcodes.com"
DOMAIN_URL = "http://www.joshuadanielcodes.com"

ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME')
ADMINS = os.environ.get('ADMINS')
MANAGERS = os.environ.get('ADMINS')

# Google reCaptcha
RECAPTCHA_SITE_KEY = os.environ.get('RECAPTCHA_SITE_KEY')
RECAPTCHA_SECRET_KEY = os.environ.get('RECAPTCHA_SECRET_KEY')

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')

# Email Server Settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True
EMAIL_PORT = os.environ.get('EMAIL_PORT')
GUEST_USERNAME = os.environ.get('GUEST_USERNAME')
GUEST_PASSWORD = os.environ.get('GUEST_PASSWORD')
PERMISSION_REQUIRED = os.environ.get('PERMISSION_REQUIRED')
SERVER_EMAIL = os.environ.get('EMAIL_HOST_USER')
