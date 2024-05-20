# Generated by Django 5.0.4 on 2024-05-06 06:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Agora', '0023_alter_post_caption'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=100)),
                ('date_became_friends', models.TextField(max_length=75)),
                ('friend', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friend_friendships', to='Agora.account')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_friendships', to='Agora.account')),
            ],
            options={
                'unique_together': {('user', 'friend')},
            },
        ),
    ]
