from django.db import models
from django.conf import settings

from products.models import Product

User = settings.AUTH_USER_MODEL


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=200, blank=True, null=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True
    )
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True
    )
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(
        auto_now=False, auto_now_add=False, blank=True, null=True
    )
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(
        auto_now=False, auto_now_add=False, blank=True, null=True
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)


class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=125)
    qty = models.IntegerField(default=1, blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to="OrderItem/")

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=125)
    postal_code = models.CharField(max_length=50)
    country = models.CharField(max_length=125)
    # shipping_price = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return self.city
