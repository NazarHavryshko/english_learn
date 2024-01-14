from django.urls import path, include
from rest_framework.routers import DefaultRouter

from folder.views import folder

route = DefaultRouter()

route.register(r'', folder.FolderView, 'folder')

urlpatterns = [

]

urlpatterns += path('folder/', include(route.urls)),
