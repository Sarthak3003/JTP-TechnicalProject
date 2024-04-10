from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        # Adding the below line made it work for me.
        instance.is_active = True
        if password is not None:
            # Set password does the hash, so you don't need to call make_password 
            instance.set_password(password)
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password', None)
            instance.set_password(password)
        return super().update(instance, validated_data)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'user': self.user.username})
        data.update({'id': self.user.id})
        data.update({'email': self.user.email})
        data.update({'phone_number': self.user.phone_number})
        return data

