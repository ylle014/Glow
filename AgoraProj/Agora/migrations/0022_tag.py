# Generated by Django 5.0.4 on 2024-05-05 12:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Agora', '0021_alter_post_datetime'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=500)),
                ('post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Agora.post')),
            ],
        ),
    ]
