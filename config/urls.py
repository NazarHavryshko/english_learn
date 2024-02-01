from django.conf.urls.static import static

from .settings import STATIC_URL, STATIC_ROOT

from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('api.urls')),
    path('', include('frontend.urls')),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
]

urlpatterns += static(STATIC_URL, document_root=STATIC_ROOT)
