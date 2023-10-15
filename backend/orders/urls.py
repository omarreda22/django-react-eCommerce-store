from django.urls import re_path

from .views import index

app_name = 'index'


urlpatterns = [
    re_path('.*/', index)
]
