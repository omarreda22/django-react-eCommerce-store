from django.urls import path

from .views import (
    ProductsList,
    ProductDetails,
    ProductCreate
)

app_name = 'api'


urlpatterns = [
    path('', ProductsList.as_view(), name='products'),
    path('create/', ProductCreate.as_view()),
    path('<str:slug>/', ProductDetails.as_view(), name='product'),
]
