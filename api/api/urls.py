from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('dj_rest_auth.urls')),
    path('api/registration/', include('dj_rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
]
