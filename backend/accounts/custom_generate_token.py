from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerialziersWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    # For DeCode in JWT website
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['first_name'] = user.first_name
        token['email'] = user.email

        return token

    # When Generate New Token
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['last_name'] = self.user.last_name
        # data['email'] = self.user.email
        serializer = UserSerialziersWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer