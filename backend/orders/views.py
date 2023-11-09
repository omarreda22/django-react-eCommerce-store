from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView

from .models import Order, OrderItem, ShippingAddress
from products.models import Product
from .serializers import OrderSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]

    if len(orderItems) == 0:
        return Response(
            {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # (1) Create order
        order = Order.objects.create(
            user=user,
            payment_method=data["shippingAddress"]["payment"],
            tax_price=data["taxPrice"],
            shipping_price=data["shippingPrice"],
            total_price=data["totalPrice"],
        )

        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postal_code=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            # slug = i["product"]["slug"]
            product = Product.objects.get(slug=i["slug"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url,
            )

            # (4) Update stock
            product.countinStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


class OrdersList(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
