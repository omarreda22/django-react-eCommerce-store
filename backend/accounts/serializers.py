from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


##### for profile url
class UserProfileSerialzier(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username','email', 'first_name', 'last_name', 'phone_number', 'address', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


###### For Login url
class UserSerialziersWithToken(UserProfileSerialzier):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username','email', 'first_name', 'last_name', 'phone_number', 'address', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2', 'phone_number', 'address', 'token']
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)
        email = validated_data.pop('email', None)
        username = validated_data.pop('username', None)

        instance = self.Meta.model(**validated_data)
        
        if password and password2 and password == password2:
            instance.set_password(password)
        else:
            raise serializers.ValidationError("Password don't match")

        users = get_user_model().objects.all()

        if users.filter(email=email).exists():
            raise serializers.ValidationError("This Email Already Exist")
        instance.email = email

        if users.filter(username=username).exists():
            raise serializers.ValidationError("This Username Already Exist")
        instance.username = username

        instance.save()
        return instance


    def update(self, instance, validated_data):
        username = validated_data.get('username', None)
        email = validated_data.get('email', None)
        first_name = validated_data.get('first_name', None)
        last_name = validated_data.get('last_name', None)
        phone_number = validated_data.get('phone_number', None)
        address = validated_data.get('address', None)

        password = validated_data.get('password', None)
        password2 = validated_data.get('password2', None)

        if password and password2 and password == password2:
            instance.set_password(password)
        elif password != password2:
            raise serializers.ValidationError("Password don't match")


        
        users = get_user_model().objects.all()
        
        if users.filter(email=email).exists():
            raise serializers.ValidationError("This Email Already Exist")
        if email : instance.email = str(email)

        if users.filter(username=username).exists():
            raise serializers.ValidationError("This Username Already Exist")
        if username: instance.username = str(username)
        if first_name: instance.first_name = str(first_name)
        if last_name: instance.last_name = str(last_name)
        if phone_number: instance.phone_number = str(phone_number)
        if address: instance.address = str(address)

        instance.save()
        return instance

    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UpdatePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['old_password' ,'password', 'password2']
