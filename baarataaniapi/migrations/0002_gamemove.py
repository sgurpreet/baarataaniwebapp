# Generated by Django 2.0.3 on 2018-04-03 21:05

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('baarataaniapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameMove',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('move_from', models.IntegerField(validators=[django.core.validators.MaxValueValidator(25), django.core.validators.MinValueValidator(1)])),
                ('move_to', models.IntegerField(validators=[django.core.validators.MaxValueValidator(25), django.core.validators.MinValueValidator(1)])),
                ('player_id', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2), django.core.validators.MinValueValidator(1)])),
                ('pattern_before_move', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2), django.core.validators.MinValueValidator(1)])),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='moves', to='baarataaniapi.Game')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
