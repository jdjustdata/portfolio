# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-01-16 20:27
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_admin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50, validators=[django.core.validators.RegexValidator(message='Names may contain letters, spaces, and periods', regex='[a-zA-Z\\s\\.]+')]),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=50, validators=[django.core.validators.RegexValidator(message='Names may contain letters, spaces, and periods', regex='[a-zA-Z\\s\\.]+')]),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=50, validators=[django.core.validators.RegexValidator(message='Usernames may contain letters, numbers, ampersand, hyphen, underscore, and periods (no spaces)', regex='[a-zA-Z0-9@-_\\.]+')]),
        ),
    ]
