from crum import get_current_user
from rest_framework.permissions import IsAuthenticated

from common.views.mixin import ListCreateDestroyUpdateViewSet
from drf_spectacular.utils import extend_schema_view, extend_schema

from folder.models.folder import Folder
from folder.serializers.api import folder as folders
from datetime import datetime


@extend_schema_view(
    list=extend_schema(summary='Get folders', tags=['Folder']),
    create=extend_schema(summary='Create folder', tags=['Folder']),
    partial_update=extend_schema(summary='Update folder', tags=['Folder']),
    destroy=extend_schema(summary='Delete folder', tags=['Folder']),
)
class FolderView(ListCreateDestroyUpdateViewSet):
    permission_classes = [IsAuthenticated]

    http_method_names = ('get', 'post', 'patch', 'delete')

    def get_serializer_class(self):
        serializer_classes = {
            'create': folders.FolderCreateSerializer,
            'partial_update': folders.FolderUpdateSerializer,
            'list': folders.FolderListSerializer,
            'destroy': folders.FolderDeleteSerializer,
        }
        return serializer_classes[self.action]

    def get_queryset(self):
        return Folder.objects.filter(parent=None, created_by=self.request.user)


