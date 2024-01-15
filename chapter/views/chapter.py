from crum import get_current_user
from rest_framework.permissions import IsAuthenticated

from chapter.models.chapter import Chapter
from chapter.serializers.api import chapter
from common.views.mixin import CRUDViewSet
from drf_spectacular.utils import extend_schema_view, extend_schema


@extend_schema_view(
    retrieve=extend_schema(summary='Get chapter', tags=['Chapter']),
    create=extend_schema(summary='Create chapter', tags=['Chapter']),
    partial_update=extend_schema(summary='Update chapter', tags=['Chapter']),
    destroy=extend_schema(summary='Delete chapter', tags=['Chapter']),
)
class ChapterView(CRUDViewSet):
    queryset = Chapter.objects.filter(created_at=get_current_user())
    permission_classes = [IsAuthenticated]

    http_method_names = ('get', 'post', 'patch', 'delete')

    def get_serializer_class(self):
        serializer_classes = {
            'create': chapter.ChapterCreateSerializer,
            'partial_update': chapter.ChapterUpdateSerializer,
            'retrieve': chapter.ChapterRetrieveSerializer,
            'destroy': chapter.ChapterDeleteSerializer,
        }
        return serializer_classes[self.action]
