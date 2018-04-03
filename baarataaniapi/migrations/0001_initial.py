# Generated by Django 2.0.3 on 2018-04-02 22:51

import baarataaniapi.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('game_id', models.CharField(default=baarataaniapi.models.increment_game_number, editable=False, max_length=25)),
                ('client_game_id', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
