from django.urls import path, include

from .custom_generate_token import MyTokenObtainPairView
from .views import (
    UserList,
    UserProfile,
    UserRegister,
    UserProfileUpdate,
    update_password
)

app_name = 'accounts'


urlpatterns = [
    # Generate New Token
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('register/', UserRegister.as_view()),
    path('profile/', UserProfile.as_view()),
    path('profile/update/<str:username>', UserProfileUpdate.as_view()),
    path('list/', UserList.as_view()),
    path('update_password/', update_password)
]
