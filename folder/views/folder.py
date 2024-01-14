from rest_framework.permissions import IsAuthenticated

from common.views.mixin import ListCreateUpdateViewSet
from drf_spectacular.utils import extend_schema_view, extend_schema

from folder.models.folder import Folder
from folder.serializers.api.folder import FolderCreateSerializer, \
    FolderUpdateSerializer, FolderListSerializer


@extend_schema_view(
    list=extend_schema(summary='Get folders', tags=['Folder']),
    create=extend_schema(summary='Create folder', tags=['Folder']),
    partial_update=extend_schema(summary='Update folder', tags=['Folder']),
)
class FolderView(ListCreateUpdateViewSet):
    queryset = Folder.objects.filter(parent=None)
    permission_classes = [IsAuthenticated]

    http_method_names = ('get', 'post', 'patch')

    def get_serializer_class(self):
        if self.action == 'create':
            return FolderCreateSerializer
        if self.action == 'partial_update':
            return FolderUpdateSerializer
        if self.action == 'list':
            return FolderListSerializer



