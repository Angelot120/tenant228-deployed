
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class EquipmentsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipments_category
        fields = ['id', 'category_name']


class HousingImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Housing_img
        fields = ['id', 'image_url']


class HousingCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Housing_category
        fields = ['id', 'category_name', 'category_img_url', 'created_at']


class OutstandingEquipmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outstanding_equipment
        fields = ['id', 'equipment_name', 'equipment_img_url', 'equipment_category_id']


class UsefullEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usefull_equipment
        fields = ['id', 'usefull_equipment_name', 'usefull_equipment_img_url']


class IncludedServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Included_services
        fields = ['id', 'service_name']


class BasicSuppliersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basic_suppliers
        fields = ['id', 'basic_suppliers_name', ]


class NearestLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nearest_location
        fields = ['id', 'nameAndDistance']


class SecurityEquipmentsSerilaliezer(serializers.ModelSerializer):
    class Meta:
        model = Security_equipment
        fields = ['id', 'equipment_name', 'equipment_image_url', 'equipment_category_id']


class DescriptiveOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descriptive_options
        fields = ['id', 'descriptive_options_name', 'descriptive_options_img_url']


class RoomImgSerialiezer(serializers.ModelSerializer):
    class Meta:
        model = Room_img
        fields = ['id', 'image_url']


class AdventagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adventages
        fields = ['id', 'adventages_name']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_name', 'room_empty', 'room_img_id']


class HousePricingSerialiser(serializers.ModelSerializer):
    class Meta:
        model = House_pricing
        fields = ['id', 'on_line_payment', 'payment_by_night', 'price_by_night', 'payment_by_week', 'price_by_week', 'payment_by_month', 'price_by_month', 'cancellation_price_available', 'cancellation_price', 'for_sale_pricing', 'for_sale_pricing_discussed']


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'
        extra_kwargs = {
            'user_id': {'write_only': True}
        }


class HousingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Housing
        fields = '__all__'
        # '__all__'
        # extra_kwargs = {'author': {'read_only': True}}


# Foreign key constraints
# ['housing_img_id', 'room_id', 'housing_category_id', 'included_services_id', 'nearest_location_id', 'house_pricing_id', 'outstanding_equipments_id', 'security_equipments_id', 'descriptive_options_id', 'advantages_id', 'basic_suppliers_id', 'provider_id', 'author_id']

class CompanyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company_category
        fields = ['id', 'category_img_url', 'category_name']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_email', 'company_phone_no', 'company_logo', 'activity_sector', 'nb_employees', 'slogan', 'description', 'address', 'map_long', 'map_lat', 'banner_img_url']


class HousingOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Housing_order
        fields = [
            'id',
            'user_id',
            'housing_id',
            'firstname',
            'lastname',
            'email',
            'birth_date',
            'gender',
            'reservation_for_you',
            'for_who_first_name',
            'for_who_last_name',
            'for_who_email',
            'for_who_phone_no',
            'nb_peaple',
            'nb_children',
            'duration',
            'starting_date',
            'starting_hour',
            'ending_date',
            'un_know_duration',
            'ordered',
            'payment_choice',
            'special_request',
            'phone_no',
            'on_line_paiment',
            'order_accepted',
            'completed',
            'created_at',
        ]
        read_only_fields = ('user_id',)


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'user_id', 'housing_order_id']


class ManageHousingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manage_housing
        fields = ['id', 'housing_order_id', 'provider_id', 'order_accepted', 'completed']


class SubscribersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['id', 'company_id', 'user_id']

class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['id', 'company_id']


class UserInfoSerializer(serializers.ModelSerializer):
    class meta:
        model = User_info
        fields = ['id', 'user', 'date_of_birth', 'phone_no', 'sex', 'is_confirmed']


class OtpCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Otp_code
        fields = ['id', 'email', 'otp_code']


