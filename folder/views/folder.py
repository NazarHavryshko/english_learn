from crum import get_current_user
from rest_framework.permissions import IsAuthenticated

from common.views.mixin import ListCreateDestroyUpdateViewSet
from drf_spectacular.utils import extend_schema_view, extend_schema

from folder.models.folder import Folder
from folder.serializers.api import folder


@extend_schema_view(
    list=extend_schema(summary='Get folders', tags=['Folder']),
    create=extend_schema(summary='Create folder', tags=['Folder']),
    partial_update=extend_schema(summary='Update folder', tags=['Folder']),
    destroy=extend_schema(summary='Delete folder', tags=['Folder']),
)
class FolderView(ListCreateDestroyUpdateViewSet):
    queryset = Folder.objects.filter(parent=None, created_at=get_current_user())
    permission_classes = [IsAuthenticated]

    http_method_names = ('get', 'post', 'patch', 'delete')

    def get_serializer_class(self):
        serializer_classes = {
            'create': folder.FolderCreateSerializer,
            'partial_update': folder.FolderUpdateSerializer,
            'list': folder.FolderListSerializer,
            'destroy': folder.FolderDeleteSerializer,
        }
        return serializer_classes[self.action]


