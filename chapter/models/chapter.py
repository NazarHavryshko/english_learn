from django.db import models

from common.models.mixin import InfoMixin


class Chapter(InfoMixin):

    name = models.CharField('Name', max_length=64)
    folder = models.ForeignKey('folder.Folder', models.CASCADE, 'chapters',
                               verbose_name='Folder')
    text = models.TextField('Text')

    def __str__(self):
        return f"{self.name} ({self.pk})"

    class Meta:
        ordering = ['name', 'pk']
