from django.contrib import admin

from folder.models.folder import Folder


@admin.register(Folder)
class FolderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by')
    readonly_fields = (
        'created_by', 'created_at', 'updated_by', 'updated_at'
    )
