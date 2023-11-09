from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("web-login/", include("rest_framework.urls")),  # login in borwser
    path("api/user/", include("accounts.urls", namespace="accounts")),
    path("api/products/", include("products.urls", namespace="products")),
    path("api/orders/", include("orders.urls", namespace="orders")),
    # path('', TemplateView.as_view(template_name='index.html')),
    # re_path('.*',  TemplateView.as_view(template_name='index.html')),
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
