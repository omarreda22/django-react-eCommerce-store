from rest_framework import serializers

from .models import Order, OrderItem, ShippingAddress
from accounts.serializers import UserProfileSerialzier


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_user(self, obj):
        user = obj.user
        serializer = UserProfileSerialzier(user, many=False)
        return serializer.data

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            _address = obj.shippingaddress  # onetoOne Field
            address = ShippingAddressSerializer(_address, many=False).data
        except:
            address = False
        return address
