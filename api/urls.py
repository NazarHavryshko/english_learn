from django.urls import path, include, re_path

from api.spectacular.urls import urlpatterns as spec_urls
from folder.urls import urlpatterns as folder_urls
from chapter.urls import urlpatterns as chapter_urls
from user.urls import urlpatterns as auth_urls


app_name = 'api'

urlpatterns = [

]

urlpatterns += spec_urls
urlpatterns += folder_urls
urlpatterns += chapter_urls
urlpatterns += auth_urls

