from rest_framework import serializers

from chapter.models.chapter import Chapter


class ChapterListSerializer(serializers.ModelSerializer):
    inside = serializers.SerializerMethodField()
    type_v = serializers.SerializerMethodField()

    class Meta:
        model = Chapter
        fields = (
            'id',
            'name',
            'type_v',
            'inside'
        )

    def get_inside(self, obj) -> None:
        return None

    def get_type_v(self, obj) -> str:
        return 'chapter'
