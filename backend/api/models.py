import uuid
from datetime import datetime, timedelta

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.

class Equipments_category(models.Model):
    category_name = models.CharField(max_length=128)


class Housing_img(models.Model):
    image_url = models.ImageField(upload_to="UploadedImages/housing_img", blank=True, null=True)


class Housing_category(models.Model):

    category_name = models.CharField(max_length=128)
    category_img_url = models.ImageField(upload_to="UploadedImages/category_img", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Outstanding_equipment(models.Model):

    equipment_name = models.CharField(max_length=128)
    equipment_img_url = models.ImageField(upload_to="UploadedImages/outstand", blank=True, null=True)
    equipment_category_id = models.ForeignKey(Equipments_category, on_delete=models.CASCADE, related_name='housing_category')


class Usefull_equipment(models.Model):

    usefull_equipment_name = models.CharField(max_length=128)
    usefull_equipment_img_url = models.ImageField(upload_to="UploadedImages/usefull", blank=True, null=True)


class Included_services(models.Model):

    service_name = models.CharField(max_length=128)

class Basic_suppliers(models.Model):
    basic_suppliers_name = models.CharField(max_length=128)


class Nearest_location(models.Model):

    nameAndDistance = models.CharField(max_length=128)
    # distance = models.FloatField(default=0.0)


class Security_equipment(models.Model):

    equipment_name = models.CharField(max_length=128)
    equipment_image_url = models.ImageField(upload_to="UploadedImages/security_equipment_img", blank=True, null=True)
    equipment_category_id = models.ForeignKey(Equipments_category, on_delete=models.CASCADE, related_name='security_equipment')


class Descriptive_options(models.Model):

    descriptive_options_name = models.CharField(max_length=128)
    descriptive_options_img_url = models.ImageField(upload_to="desciptive_options_img", blank=True, null=True)


class Room_img(models.Model):

    image_url = models.ImageField(upload_to="UploadedImages/room_img", blank=True, null=True)


class Adventages(models.Model):

   adventages_name = models.CharField(max_length=128)


class Room(models.Model):

    room_name = models.CharField(max_length=128)
    room_empty = models.BooleanField(default=False)
    room_img_id = models.ManyToManyField(Room_img)
    # room_adventages_id = models.ManyToManyField(Room_adventages)


class House_pricing(models.Model):
    on_line_payment = models.BooleanField(default=False)
    payment_by_night = models.BooleanField()
    price_by_night = models.FloatField(default=0.0, null=True)
    payment_by_week = models.BooleanField()
    price_by_week = models.FloatField(default=0.0, null=True)
    payment_by_month = models.BooleanField()
    price_by_month = models.FloatField(default=0.0, null=True)
    cancellation_price_available = models.BooleanField()
    cancellation_price = models.FloatField(default=0.0, null=True)
    for_sale_pricing = models.FloatField(default=0.0, null=True)
    for_sale_pricing_discussed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)



class Provider(models.Model):

    user_id = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    post = models.CharField(max_length=128, null=True)
    cni_tof_url_one = models.ImageField(upload_to='UploadedImages/CNI_TOP', blank=True, null=True)
    cni_tof_url_two = models.ImageField(upload_to='UploadedImages/CNI_TOP', blank=True, null=True)
    web_site_url = models.TextField(blank=True, null=True)
    subscribe_payment_resolved = models.BooleanField(default=False)
    whoAreYou = models.BooleanField(default=False)
    company_type = models.CharField(max_length=128, null=True)
    profile_img = models.ImageField(upload_to='UploadedImages/user_profile_img', blank=True, null=True)
    phone_num = models.IntegerField(null=True)
    firstname = models.CharField(max_length=255, null=True)
    lastname = models.CharField(max_length=255, null=True)
    birth_data = models.DateTimeField(blank=True, null=True)
    # post = models.CharField(max_length=255, null=True)
    # web_site_url = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)



class Housing(models.Model):

    title = models.CharField(max_length=255)
    bref_description = models.TextField(blank=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=128)
    country = models.CharField(max_length=128)
    municipality = models.CharField(max_length=128)
    town = models.CharField(max_length=128)
    postal_code = models.IntegerField()
    map_long = models.FloatField()
    map_lat = models.FloatField()
    dimension = models.FloatField(null=True)
    nb_people = models.IntegerField()
    all_nb_bed = models.IntegerField()
    nb_room = models.IntegerField()
    total_nb_bath_room = models.IntegerField()
    special_request = models.BooleanField(default=True)
    room_in_hotel = models.BooleanField(default=False)
    allow_child = models.BooleanField(default=True)
    # why_housing_unique = models.TextField(blank=True, null=True)
    housing_empty = models.BooleanField(default=False)
    given_documents = models.CharField(max_length=128, null=True)
    housing_no = models.IntegerField(null=True)
    housing_kind = models.CharField(max_length=50)
    service_type = models.IntegerField()
    direct_owner = models.BooleanField(default=True)
    is_published = models.BooleanField(default=False)
    reserved = models.BooleanField(default=False)

    # Foreign key constraints
    housing_img_id = models.ManyToManyField(Housing_img)
    # room_id = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='housing')
    room_id = models.ManyToManyField(Room, related_name='housing')
    housing_category_id = models.ForeignKey(Housing_category, on_delete=models.CASCADE, related_name='housing', null=True)
    included_services_id = models.ManyToManyField(Included_services)
    nearest_location_id = models.ManyToManyField(Nearest_location)
    house_pricing_id = models.OneToOneField(House_pricing, on_delete=models.CASCADE, null=True)
    outstanding_equipments_id = models.ManyToManyField(Outstanding_equipment)
    security_equipments_id = models.ManyToManyField(Security_equipment)
    descriptive_options_id = models.ManyToManyField(Descriptive_options)
    advantages_id = models.ManyToManyField(Adventages)
    basic_suppliers_id = models.ManyToManyField(Basic_suppliers)
    provider_id = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='housing', null=True)
    usefull_eq_id = models.ManyToManyField(Usefull_equipment)
    created_at = models.DateTimeField(auto_now_add=True)
    # author_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='housing')



class Company_category(models.Model):
    category_img_url = models.ImageField(upload_to='company_category', blank=True, null=True)
    category_name = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)


class Company(models.Model):

    company_name = models.CharField(max_length=128)
    company_email = models.CharField(max_length=60)
    company_phone_no = models.IntegerField()
    company_logo = models.ImageField(upload_to='UploadedImages/company_logo', blank=True, null=True)
    activity_sector = models.CharField(max_length=128)
    nb_employees = models.IntegerField()
    slogan = models.CharField(max_length=255, null=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255)
    map_long = models.FloatField(default=0.0)
    map_lat = models.FloatField(default=0.0)
    banner_img_url = models.ImageField(upload_to='UploadedImages/company_banner_img', blank=True, null=True)
    provider_id = models.OneToOneField(Provider, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


# Payment
class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Montant en XOF
    duration_months = models.IntegerField()  # Durée en mois
    trial_days = models.IntegerField(default=100)  # Durée d'essai gratuit en jours
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class Housing_order(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    housing_id = models.ForeignKey(Housing, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=128)
    lastname = models.CharField(max_length=128)
    email = models.CharField(max_length=128)
    birth_date = models.DateTimeField()
    gender = models.BooleanField()
    reservation_for_you = models.BooleanField()
    for_who_first_name = models.CharField(max_length=128, null=True)
    for_who_last_name = models.CharField(max_length=128, null=True)
    for_who_email = models.CharField(max_length=128, null=True)
    for_who_phone_no = models.IntegerField(null=True)
    nb_peaple = models.IntegerField()
    nb_children = models.IntegerField()
    duration = models.CharField(max_length=20, null=True)
    starting_date = models.DateTimeField(blank=True, null=True)
    starting_hour = models.TimeField(blank=True, null=True)
    ending_date = models.DateTimeField(blank=True, null=True)
    un_know_duration = models.BooleanField()
    ordered = models.BooleanField(default=False)
    payment_choice = models.CharField(max_length=1, null=True)
    special_request = models.TextField(blank=True, null=True)
    phone_no = models.IntegerField()
    on_line_paiment = models.BooleanField(default=False)
    order_accepted = models.BooleanField(null=True, default=None)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)



class Card(models.Model):

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    housing_order_id = models.ManyToManyField(Housing_order)
    created_at = models.DateTimeField(auto_now_add=True)


class Manage_housing(models.Model):
    housing_order_id = models.ForeignKey(Housing_order, on_delete=models.CASCADE)
    provider_id = models.OneToOneField(Provider, on_delete=models.CASCADE)
    order_accepted = models.BooleanField(null=True)
    completed = models.BooleanField(default=False)


class Subscribe(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class User_info(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    phone_no = models.IntegerField(null=True)
    sex = models.BooleanField(null=True)
    is_confirmed = models.BooleanField(default=False)


"""class Otp_code(models.Model):
    email = models.CharField(max_length=50)
    opt_code = models.IntegerField(8)
"""



class Otp_code(models.Model):
    email = models.EmailField(unique=True)
    otp_code = models.PositiveIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # def is_valid(self):
        # return timezone.now() < self.created_at + timedelta(minutes=10)