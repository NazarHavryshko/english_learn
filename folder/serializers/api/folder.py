import typing

from rest_framework import serializers
from rest_framework.exceptions import ParseError

from chapter.serializers.nested.chapter import ChapterListSerializer
from folder.models.folder import Folder


class FolderListSerializer(serializers.ModelSerializer):
    inside = serializers.SerializerMethodField()
    type_v = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = (
            'id',
            'name',
            'type_v',
            'inside'
        )

    def get_inside(self, obj) -> typing.Optional[typing.List]:

        children = obj.children.all()
        if children:
            return FolderListSerializer(children, many=True).data

        chapters = obj.chapters.all()
        if chapters:
            return [ChapterListSerializer(chapter).data for chapter in chapters]

        return None

    def get_type_v(self, obj) -> str:
        return 'folder'


class FolderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = (
            'id',
            'name',
        )


class FolderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = (
            'name',
            'parent',
        )

    def validate(self, attrs):
        max_depth = 3
        depth = 0

        current_folder = attrs['parent']

        while current_folder.parent:
            depth += 1
            if depth > max_depth:
                raise ParseError(
                    "The maximum nesting depth of folders has been reached.")

            current_folder = current_folder.parent

        return attrs


class FolderDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = (
            'id'
        )
