from django.db import models

from common.models.mixin import InfoMixin


class Folder(InfoMixin):

    name = models.CharField('Name', max_length=64)
    parent = models.ForeignKey('self', models.CASCADE, 'children', blank=True, null=True)

    def __str__(self):
        return self.name
