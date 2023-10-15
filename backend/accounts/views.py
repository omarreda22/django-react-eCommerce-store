from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import APIException

from .serializers import UserProfileSerialzier, UserRegisterSerializer, UpdatePasswordSerializer

User = get_user_model()


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerialzier
    permission_classes = [IsAdminUser]


class UserProfile(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerialzier
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        user = self.request.user
        return qs.filter(username=user.username)


class UserProfileUpdate(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'
    
    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        user = self.request.user
        return qs.filter(username=user.username)

    def perform_update(self, serializer, *args, **kwargs):
        username = self.kwargs.get('username')
        user = self.request.user
        if username == user.username:
            instance = serializer.save()

        """
            finish this
            password sreialixe
            password = serializer.validated_data.get('password')
            print(user.check_password(password))
        """

class UserRegister(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_password(request):
    """
        I using fbs for make url /user/update_password
        not
        f'/user/update_password/{username}'
    """
    user = request.user
    serializers = UpdatePasswordSerializer(user, many=False)

    data = request.data 
    old_password = data['old_password']
    password = data['password']
    password2 = data['password2']

    old_right = user.check_password(old_password)
    if not old_right:
        raise APIException("Old Password Wrong")

    if password != '' and password2 != '' and password == password2:
        user.password = make_password(data['password'])
    else:
        raise APIException("Password Not Match")

    user.save()

    return Response(serializers.data)
