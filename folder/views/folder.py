from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from common.views.mixin import ListCreateDestroyUpdateViewSet, CRUDViewSet
from drf_spectacular.utils import extend_schema_view, extend_schema

from folder.models.folder import Folder
from folder.serializers.api import folder as folders
from folder.serializers.nested.folder import FolderListSerializer


@extend_schema_view(
    list=extend_schema(summary='Get root folders', tags=['Folder']),
    retrieve=extend_schema(summary='Get folders', tags=['Folder']),
    create=extend_schema(summary='Create folder', tags=['Folder']),
    partial_update=extend_schema(summary='Update folder', tags=['Folder']),
    destroy=extend_schema(summary='Delete folder', tags=['Folder']),
)
class FolderView(CRUDViewSet, mixins.ListModelMixin):
    permission_classes = [IsAuthenticated]

    http_method_names = ('get', 'post', 'patch', 'delete')

    def get_serializer_class(self):
        serializer_classes = {
            'create': folders.FolderCreateSerializer,
            'partial_update': folders.FolderUpdateSerializer,
            'retrieve': folders.FolderRetrieveSerializer,
            'list': FolderListSerializer,
            'destroy': folders.FolderDeleteSerializer,
        }
        return serializer_classes[self.action]

    def get_queryset(self):
        if self.action == 'list':
            return Folder.objects.filter(parent=None, created_by=self.request.user)
        return Folder.objects.filter(created_by=self.request.user)


