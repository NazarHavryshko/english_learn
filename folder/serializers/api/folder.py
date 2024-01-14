from rest_framework import serializers

from chapter.serializers.chapter import ChapterListSerializer
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

    def get_inside(self, obj):

        children = obj.children.all()
        if children:
            return FolderListSerializer(children, many=True).data

        chapters = obj.chapters.all()
        if chapters:
            return [ChapterListSerializer(chapter).data for chapter in chapters]

        return None

    def get_type_v(self, obj):
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
