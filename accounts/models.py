from django.db import models

# manual imports
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _

from .managers import CustomUserManager

# Create your models here.


class CustomUser(AbstractUser):
    username = models.CharField(_("Username"), max_length=255, null=True, blank=True)
    email = models.EmailField(_("email address"), unique=True)
    phone_number = models.CharField(_("phone number"), null=True, max_length=15)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = (
        "username",
    )
