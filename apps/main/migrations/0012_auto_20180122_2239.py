# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-01-23 04:39
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20180122_2238'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectskill',
            name='project',
        ),
        migrations.RemoveField(
            model_name='projectskill',
            name='skill',
        ),
        migrations.DeleteModel(
            name='ProjectSkill',
        ),
    ]
