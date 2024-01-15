from rest_framework import serializers
from rest_framework.exceptions import ParseError

from chapter.models.chapter import Chapter
from folder.models.folder import Folder


class ChapterRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = (
            'id',
            'name',
            'text'
        )


class ChapterUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        read_only_fields = ('text', 'id')
        fields = (
            'id',
            'name',
        )


class ChapterCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = (
            'folder',
            'name',
            'text',
        )


class ChapterDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
