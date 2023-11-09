from django.urls import path

from . import views

app_name = "orders"


urlpatterns = [
    path("add/", views.add_order, name="add_orders"),
    path("", views.OrdersList.as_view()),
]
