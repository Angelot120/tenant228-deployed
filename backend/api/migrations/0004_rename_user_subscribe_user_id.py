# Generated by Django 5.1 on 2024-10-27 21:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_user_id_subscribe_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subscribe',
            old_name='user',
            new_name='user_id',
        ),
    ]