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
        chapters = obj.chapters.all()
        response = []

        if children:
            response += FolderListSerializer(children, many=True).data

        if chapters:
            response += ChapterListSerializer(chapters, many=True).data

        return response

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
        x = 'parent' not in attrs
        if 'parent' not in attrs:
            attrs['parent'] = None
            return attrs

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
