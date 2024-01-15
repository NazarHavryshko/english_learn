from django.urls import path, include
from rest_framework.routers import DefaultRouter

from chapter.views import chapter

route = DefaultRouter()

route.register(r'', chapter.ChapterView, 'chapter')

urlpatterns = [

]

urlpatterns += path('chapter/', include(route.urls)),
