# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-01-25 22:42
from __future__ import unicode_literals

import apps.main.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_auto_20180122_2239'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectimage',
            name='img_url',
            field=models.ImageField(upload_to=apps.main.models.img_directory_path),
        ),
    ]
