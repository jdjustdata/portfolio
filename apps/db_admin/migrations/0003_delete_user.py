# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-06 22:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db_admin', '0002_auto_20180116_1427'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
