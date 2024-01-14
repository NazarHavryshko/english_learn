from django.contrib import admin

from chapter.models.chapter import Chapter


@admin.register(Chapter)
class FolderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by')
    readonly_fields = (
        'created_by', 'created_at', 'updated_by', 'updated_at'
    )

