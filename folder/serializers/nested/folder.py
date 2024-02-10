from rest_framework import serializers
from folder.models.folder import Folder


class FolderListSerializer(serializers.ModelSerializer):
    type_v = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = (
            'id',
            'name',
            'type_v'
        )



    def get_type_v(self, obj) -> str:
        return 'folder'
