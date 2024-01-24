from django.urls import path, include

from api.spectacular.urls import urlpatterns as spec_urls
from folder.urls import urlpatterns as folder_urls
from chapter.urls import urlpatterns as chapter_urls
from word.urls import urlpatterns as word_urls

app_name = 'api'

urlpatterns = [

]

urlpatterns += spec_urls
urlpatterns += folder_urls
urlpatterns += chapter_urls
# urlpatterns += word_urls
