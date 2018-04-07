# Generated by Django 2.0.3 on 2018-04-06 01:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baarataaniapi', '0005_auto_20180404_0550'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamemove',
            name='player_id_1_Score',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(25), django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AddField(
            model_name='gamemove',
            name='player_id_2_Score',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(25), django.core.validators.MinValueValidator(0)]),
        ),
    ]
