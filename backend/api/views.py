import random
from collections import defaultdict

from django.conf import settings
from django.core.mail import send_mail
from django.db.models import Count
from django.db.models.functions import TruncMonth, ExtractMonth
from django.shortcuts import render
from django.utils.html import format_html
from rest_framework import generics, viewsets, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


# Create your views here.

class GetAdminUser(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        return Response({"is_superuser": user.is_superuser})

class GetUser(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

"""
class GetConnectedUser(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return [self.request.user]

"""


class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        if User.objects.filter(email=email).exists():
            # raise ValidationError("Cet email est déjà utilisé par un autre utilisateur.")
            return Response({"message": "Cet email est déjà utilisé par un autre utilisateur."}, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        otp_code = str(random.randint(100000, 999999))
        email = user.email
        name = user.username

        send_mail(
            'Veullez véfifier votre email',
            f'Bonjour {name}, \nVotre code OTP est : {otp_code} \nMerci de ne pas répondre à cet email.',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            # from_email=format_html('{} <{}>', 'Nom de l\'Entité', 'no-reply@tenant228.com'),
            fail_silently=False,
        )

        Otp_code.objects.create(email=email, otp_code=otp_code)

        return Response({'message': 'Inscription réussie, un OTP a été envoyé!'}, status=status.HTTP_201_CREATED)


class ForgottenPasswd(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user = User.objects.filter(email=request.data.get('email')).first()

        if user :
            otp_code = str(random.randint(100000, 999999))
            email = user.email
            name = user.username

            otp_exists = Otp_code.objects.filter(email=email)

            if otp_exists:
                otp_exists.delete()

            send_mail(
                'Veullez véfifier votre email',
                f'Bonjour {name}, \nVotre code OTP est : {otp_code} \nMerci de ne pas répondre à cet email.',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                # from_email=format_html('{} <{}>', 'Nom de l\'Entité', 'no-reply@tenant228.com'),
                fail_silently=False,
            )

            Otp_code.objects.create(email=email, otp_code=otp_code)

            return Response({'message': 'Inscription réussie, un OTP a été envoyé!'}, status=status.HTTP_201_CREATED)

        else :
            return Response({"message": "Email non retrouvé."}, status=status.HTTP_400_BAD_REQUEST)




class UpdatePassword(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'email'

    def update(self, request, *args, **kwargs):
        email = kwargs.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()

        if not email or not password:
            return Response({"message": "L'email et le mot de passe doivent être fournis."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()

        if user.check_password(password):
            return Response({"message": "Le mot de passe a été mis à jour avec succès."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Erreur lors de la mise à jour du mot de passe."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyOTP(generics.CreateAPIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')

        if not email or not otp_code:
            return Response({'error': 'Email et OTP sont requis!'}, status=status.HTTP_400_BAD_REQUEST)

        otp_entry = Otp_code.objects.filter(email=email).first()

        if otp_entry:
            if otp_entry.otp_code == int(otp_code):

                otp_entry.delete()
                return Response({'message': 'OTP vérifié avec succès!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'OTP invalide ou expiré!'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Aucun OTP trouvé pour cet email!'}, status=status.HTTP_404_NOT_FOUND)


class RequestNewOTP(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        try:
            otp_entry = Otp_code.objects.get(email=email)
            otp_entry.delete()
        except Otp_code.DoesNotExist:
            pass


        new_otp_code = random.randint(100000, 999999)


        Otp_code.objects.create(email=email, otp_code=new_otp_code)



        send_mail(
            'Votre nouvel OTP',
            f'Votre nouveau code OTP est : {new_otp_code} \nMerci de ne pas répondre à cet email.',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            # from_email=format_html('{} <{}>', 'Nom de l\'Entité', 'no-reply@tenant228.com'),
            fail_silently=False,
        )

        return Response({'message': 'Un nouvel OTP a été envoyé à votre adresse email.'}, status=status.HTTP_200_OK)


"""
# Otp code alternatif 
class VerifyOTP(generics.CreateAPIView):
    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')

        try:
            otp_entry = Otp_code.objects.get(email=email)

            if otp_entry.code == otp_code and otp_entry.is_valid():
                otp_entry.delete()  # Supprimer l'OTP après utilisation
                return Response({'message': 'OTP vérifié avec succès!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'OTP invalide ou expiré!'}, status=status.HTTP_400_BAD_REQUEST)

        except Otp_code.DoesNotExist:
            return Response({'error': 'Aucun OTP trouvé pour cet email!'}, status=status.HTTP_404_NOT_FOUND)
"""


class EquipmentsCategoryCreate(viewsets.ModelViewSet):
    queryset = Equipments_category.objects.all()
    serializer_class = EquipmentsCategorySerializer
    permission_classes = [IsAuthenticated]


class GetHousing(viewsets.ModelViewSet):
    # queryset = Housing.objects.all()
    serializer_class = HousingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        providers = Provider.objects.filter(user_id=self.request.user)
        if providers.exists():
            provider_ids = providers.values_list('id', flat=True)
            return Housing.objects.filter(provider_id__in=provider_ids)
        return Housing.objects.none()


class GetHousingStats(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user=self.request.user
        provider = Provider.objects.filter(user_id=user).first()
        current_year = datetime.now().year
        monthly_stats = Housing.objects.filter(provider_id=provider ,created_at__year=current_year).annotate(
            month=ExtractMonth('created_at')).values('month').annotate(count=Count('id')).order_by('month')

        # Crée un dictionnaire avec des mois comme clés
        stats = defaultdict(int)
        for stat in monthly_stats:
            stats[stat['month']] = stat['count']

        # Complète les mois sans données
        for month in range(1, 13):
            if month not in stats:
                stats[month] = 0

        return Response(stats)


class GetCategoricHousing(viewsets.ModelViewSet):
    # queryset = Housing.objects.all()
    serializer_class = HousingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk is not None:
            housing = Housing.objects.filter(housing_category_id=pk)
            return housing


class HousingCreate(viewsets.ModelViewSet):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer
    permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):

        special_request_value = request.data.get('special_request')
        special_request = True if special_request_value in ['True', 'true'] else False

        allow_child_value = request.data.get('allow_child_value')
        allow_child = True if allow_child_value in ['True', 'true'] else False

        housing_empty_value = request.data.get('housing_empty')
        housing_empty = True if housing_empty_value in ['True', 'true'] else False


        direct_owner_value = request.data.get('direct_owner')
        direct_owner = True if direct_owner_value in ['True', 'true'] else False

        housing = Housing.objects.create(
            title=request.data.get('title'),
            bref_description=request.data.get('bref_description', ''),
            description=request.data.get('description', ''),
            address=request.data.get('address'),
            country=request.data.get('country'),
            municipality=request.data.get('municipality'),
            town=request.data.get('town'),
            postal_code=request.data.get('postal_code'),
            map_long=request.data.get('map_long'),
            map_lat=request.data.get('map_lat'),
            dimension=request.data.get('dimension'),
            nb_people=request.data.get('nb_people'),
            all_nb_bed=request.data.get('all_nb_bed'),
            nb_room=request.data.get('nb_room'),
            total_nb_bath_room=request.data.get('total_nb_bath_room'),
            special_request=special_request,
            # special_request=request.data.get('special_request', True),
            room_in_hotel=request.data.get('room_in_hotel', False),
            allow_child=allow_child,
            # allow_child=request.data.get('allow_child', True),
            housing_empty=housing_empty,
            # housing_empty=request.data.get('housing_empty', False),
            given_documents=request.data.get('given_documents', ''),
            housing_no=request.data.get('housing_no', None),
            housing_kind=request.data.get('housing_kind'),
            service_type=request.data.get('service_type'),
            direct_owner=direct_owner,
            # direct_owner=request.data.get('direct_owner', True),
            is_published=request.data.get('is_published', False),
            reserved=request.data.get('reserved', False)
        )

        # Gestion des images
        housing_img_ids = request.data.getlist('housing_img_id')
        for img_id in housing_img_ids:
            try:
                housing_img = Housing_img.objects.get(id=img_id)
                housing.housing_img_id.add(housing_img)
            except Housing_img.DoesNotExist:
                return Response({"error": "Image not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des rooms
        room_ids = request.data.getlist('room_id')
        for room_id in room_ids:
            try:
                room = Room.objects.get(id=room_id)
                # housing.room_id = room
                housing.room_id.add(room)
            except Room.DoesNotExist:
                return Response({"error": "Room not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des catégories de logement
        housing_category_id = request.data.get('housing_category_id')
        if housing_category_id:
            try:
                housing.housing_category_id = Housing_category.objects.get(id=housing_category_id)
            except Housing_category.DoesNotExist:
                return Response({"error": "Housing category not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des services inclus
        included_services_ids = request.data.getlist('included_services_id')
        for service_id in included_services_ids:
            try:
                service = Included_services.objects.get(id=service_id)
                housing.included_services_id.add(service)
            except Included_services.DoesNotExist:
                return Response({"error": "Included service not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des emplacements proches
        nearest_location_ids = request.data.getlist('nearest_location_id')
        for location_id in nearest_location_ids:
            try:
                location = Nearest_location.objects.get(id=location_id)
                housing.nearest_location_id.add(location)
            except Nearest_location.DoesNotExist:
                return Response({"error": "Nearest location not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des tarifs
        house_pricing_id = request.data.get('house_pricing_id')
        if house_pricing_id:
            try:
                pricing = House_pricing.objects.get(id=house_pricing_id)
                housing.house_pricing_id = pricing
            except House_pricing.DoesNotExist:
                return Response({"error": "House pricing not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des équipements exceptionnels
        outstanding_equipment_ids = request.data.getlist('outstanding_equipments_id')
        for outstand_id in outstanding_equipment_ids:
            try:
                equipment = Outstanding_equipment.objects.get(id=outstand_id)
                housing.outstanding_equipments_id.add(equipment)
            except Outstanding_equipment.DoesNotExist:
                return Response({"error": "Outstanding equipment not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des équipements de sécurité
        security_equipment_ids = request.data.getlist('security_equipments_id')
        for security_id in security_equipment_ids:
            try:
                security = Security_equipment.objects.get(id=security_id)
                housing.security_equipments_id.add(security)
            except Security_equipment.DoesNotExist:
                return Response({"error": "Security equipment not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des options descriptives
        descriptive_options_id = request.data.get('descriptive_options_id')
        if descriptive_options_id:
            try:
                options = Descriptive_options.objects.get(id=descriptive_options_id)
                housing.descriptive_options_id.add(options)
            except Descriptive_options.DoesNotExist:
                return Response({"error": "Descriptive options not found."}, status=status.HTTP_404_NOT_FOUND)

        # Gestion des avantages
        advantage_ids = request.data.getlist('advantages_id')
        for advantage_id in advantage_ids:
            try:
                advantage = Adventages.objects.get(id=advantage_id)
                housing.advantages_id.add(advantage)
            except Adventages.DoesNotExist:
                return Response({"error": "Advantage not found."}, status=status.HTTP_404_NOT_FOUND)


        # Gestion des options descriptives
        usefull_eq_ids = request.data.getlist('usefull_eq_id')
        for usefull_eq_id in usefull_eq_ids:
            try:
                eq = Usefull_equipment.objects.get(id=usefull_eq_id)
                housing.usefull_eq_id.add(eq)
            except Usefull_equipment.DoesNotExist:
                return Response({"error": "Usefull equipement not found."}, status=status.HTTP_404_NOT_FOUND)


        # Gestion du fournisseur
        provider_id = request.data.get('provider_id')
        if provider_id and provider_id != 'undefined':
            try:
                provider_id = int(provider_id)
                provider = Provider.objects.get(id=provider_id)
                housing.provider = provider
            except ValueError:
                return Response({"error": "Invalid provider_id format."}, status=status.HTTP_400_BAD_REQUEST)
            except Provider.DoesNotExist:
                return Response({"error": "Provider not found."}, status=status.HTTP_404_NOT_FOUND)
        else:

            provider = Provider.objects.filter(user_id=self.request.user).first()
            if provider:
                housing.provider_id = provider
            else:

                who_are_you_value = request.data.get('whoAreYou')
                whoAreYou = True if who_are_you_value in ['True', 'true'] else False

                provider = Provider.objects.create(user_id=self.request.user, whoAreYou=whoAreYou, company_type=request.data.get('company_type'))
                housing.provider_id = provider


        housing.save()
        return Response(HousingSerializer(housing).data, status=status.HTTP_201_CREATED)



class HousingFilterCategory(viewsets.ModelViewSet):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk is not None:
            return Housing.objects.filter(housing_category_id=pk)
        return Housing.objects.none()



class HousingFilterCompany(viewsets.ModelViewSet):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk is not None:
            company = Company.objects.filter(id=pk).first()
            if company:
                provider = company.provider_id
                if provider:
                    return Housing.objects.filter(provider_id=provider.id)
        return Housing.objects.none()



class HousingCategoryCreate(viewsets.ModelViewSet):
    queryset = Housing_category.objects.all()
    serializer_class = HousingCategorySerializer
    permission_classes = [IsAuthenticated]


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        if 'category_img_url' not in data or not data['category_img_url']:
            data['category_img_url'] = instance.category_img_url

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class HousingCategoryGet(viewsets.ModelViewSet):
    # queryset = Housing_category.objects.all()
    serializer_class = HousingCategorySerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Utilisation de select_related en faisant référence au modèle lié directement via 'housing_category_id'
        housings = Housing.objects.select_related('housing_category_id').all()

        # Récupération des catégories associées aux logements
        all_categories = [housing.housing_category_id for housing in housings]

        # Sérialisation des catégories
        serializer = self.get_serializer(all_categories, many=True)

        return Response(serializer.data)

class HousingImgCreate(viewsets.ModelViewSet):
    queryset = Housing_img.objects.all()
    serializer_class = HousingImgSerializer
    permission_classes = [IsAuthenticated]


class OutstandingEquipmentsCreate(viewsets.ModelViewSet):
    queryset = Outstanding_equipment.objects.all()
    serializer_class = OutstandingEquipmentsSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        if 'equipment_img_url' not in data or not data['equipment_img_url']:
            data['equipment_img_url'] = instance.equipment_img_url

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)




class UsefullEquipmentCreate(viewsets.ModelViewSet):
    queryset = Usefull_equipment.objects.all()
    serializer_class = UsefullEquipmentSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        if 'usefull_equipment_img_url' not in data or not data['usefull_equipment_img_url']:
            data['usefull_equipment_img_url'] = instance.usefull_equipment_img_url

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)



class IncludedServicesGet(viewsets.ModelViewSet):
    queryset = Included_services.objects.all()
    serializer_class = IncludedServicesSerializer
    permission_classes = [IsAuthenticated]

class IncludedServicesCreate(generics.ListCreateAPIView):
    serializer_class = IncludedServicesSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Included_services.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class BasicSuppliersCreate(viewsets.ModelViewSet):
    queryset = Basic_suppliers.objects.all()
    serializer_class = BasicSuppliersSerializer
    permission_classes = [IsAuthenticated]


class NearestLocationsGet(viewsets.ModelViewSet):
    queryset = Nearest_location.objects.all()
    serializer_class = NearestLocationsSerializer
    permission_classes = [IsAuthenticated]

class NearestLocationsCreate(generics.ListCreateAPIView):
    serializer_class = NearestLocationsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nearest_location.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class SecurityEquipmentsCreate(viewsets.ModelViewSet):
    queryset = Security_equipment.objects.all()
    serializer_class = SecurityEquipmentsSerilaliezer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        if 'equipment_image_url' not in data or not data['equipment_image_url']:
            data['equipment_image_url'] = instance.equipment_image_url

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)



class DescriptiveOptionsCreate(viewsets.ModelViewSet):
    queryset = Descriptive_options.objects.all()
    serializer_class = DescriptiveOptionsSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        if 'descriptive_options_img_url' not in data or not data['descriptive_options_img_url']:
            data['descriptive_options_img_url'] = instance.descriptive_options_img_url

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


"""class DescriptiveOptionsCreate(generics.ListCreateAPIView):
    serializer_class = DescriptiveOptionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Descriptive_options.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
"""


class RoomGetImg(viewsets.ModelViewSet):
    queryset = Room_img.objects.all()
    serializer_class = RoomImgSerialiezer
    permission_classes = [IsAuthenticated]

class RoomImgCreate(generics.ListCreateAPIView):
    serializer_class = RoomImgSerialiezer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Room_img.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class AdventagesCreate(viewsets.ModelViewSet):
    queryset = Adventages.objects.all()
    serializer_class = AdventagesSerializer
    permission_classes = [IsAuthenticated]


"""class AdventagesCreate(generics.ListCreateAPIView):
    serializer_class = AdventagesSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Adventages.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
"""

class GetRoomDetail(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]


class RoomCreate(generics.ListCreateAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Room.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class HousePricingCreate(viewsets.ModelViewSet):
    queryset = House_pricing.objects.all()
    serializer_class = HousePricingSerialiser
    permission_classes = [IsAuthenticated]


class ProviderCreate(generics.ListCreateAPIView):
    serializer_class = ProviderSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Provider.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        existing_provider = Provider.objects.filter(user_id=user).first()
        if existing_provider:
            if serializer.is_valid():
                serializer.save(user_id=user)
                print(user)
                return Response({"id": existing_provider.id}, status=status.HTTP_200_OK)
        else:
            if serializer.is_valid():
                serializer.save(user_id=user)
                new_provider = Provider.objects.get(user_id=user)
                return Response({"id": new_provider.id}, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProviderGet(generics.ListCreateAPIView):
    serializer_class = ProviderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return [Provider.objects.filter(user_id=user).first()]



class ProviderEdit(viewsets.ModelViewSet):
    # queryset = House_pricing.objects.all()
    serializer_class = ProviderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Provider.objects.all()

    """def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()
        if 'profile_img' not in data or data['profile_img'] == '':
            data['profile_img'] = instance.profile_img

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)"""

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        if 'profile_img' not in data or not data['profile_img']:
            data['profile_img'] = instance.profile_img

        if 'cni_tof_url_one' not in data or not data['cni_tof_url_one']:
            data['cni_tof_url_one'] = instance.cni_tof_url_one

        if 'cni_tof_url_two' not in data or not data['cni_tof_url_two']:
            data['cni_tof_url_two'] = instance.cni_tof_url_two

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class CompanyCategoryCreate(generics.ListCreateAPIView):
    serializer_class = CompanyCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Company_category.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class CompanyCreate(viewsets.ModelViewSet):
    # queryset = House_pricing.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Company.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()
        if 'company_logo' not in data or data['company_logo'] == '':
            data['company_logo'] = instance.company_logo
        if 'banner_img_url' not in data or data['banner_img_url'] == '':
            data['banner_img_url'] = instance.banner_img_url

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def perform_create(self, serializer):
        user = self.request.user
        provider = Provider.objects.filter(user_id=user).first()

        if provider:
            company_exists = Company.objects.filter(provider_id=provider).first()

            if company_exists:
                serializer = self.get_serializer(company_exists, data=self.request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
            else:
                serializer.save(provider_id=provider)
        else:
            return Response({"detail": "Provider not found."}, status=404)



class CompanyGet(viewsets.ModelViewSet):
    # queryset = Housing_order.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        provider = Provider.objects.filter(user_id=self.request.user).first()

        company = Company.objects.filter(provider_id=provider).first()

        if company:
            return [company]
        else:
            return []


class CompanyGetAll(viewsets.ModelViewSet):
    # queryset = Housing_order.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Company.objects.all()


class CompanyGetSpecifics(viewsets.ModelViewSet):
    # queryset = Housing_order.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs['pk']
        # housing = Housing.objects.filter(id=pk).first()
        # if housing:
            # provider = Provider.objects.filter(id=housing.provider_id.id).first()
            # if provider:

        company = Company.objects.filter(id=pk)
        return company
        return Company.objects.none()



class HousingOrderOrdered(viewsets.ModelViewSet):
    queryset = Housing_order.objects.all()
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()


        data = {'ordered': False}

        if 'other_field' in request.data:
            data['other_field'] = request.data['other_field']

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Send mail
        housing = Housing.objects.filter(id=instance.housing_id.id).first()
        if housing is None:
            return Response({"detail": "Housing not found."}, status=404)

        provider = Provider.objects.filter(id=housing.provider_id.id).first()
        if provider is None:
            return Response({"detail": "Provider not found."}, status=404)

        user = User.objects.filter(id=provider.user_id.id).first()
        if user is None:
            return Response({"detail": "User not found."}, status=404)

        send_mail(
            'Annulation de commande',
            f'Bonjour {user.username}, \nVotre client {instance.firstname} {instance.lastname} a annulé la commande du logement {housing.title}.',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response(serializer.data)


class HousingOrderOrderAccepted(viewsets.ModelViewSet):
    queryset = Housing_order.objects.all()
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        pk = kwargs['pk']
        instance = Housing_order.objects.filter(id=pk).first()

        if instance is None:
            return Response({"detail": "Not found."}, status=404)

        data = {}

        # if 'completed' in request.data:
        data['order_accepted'] = False

        serializer = self.get_serializer(instance, data=data, partial=partial)

        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        # Envoi de mail
        housing = Housing.objects.filter(id=instance.housing_id.id).first()
        if housing is None:
            return Response({"detail": "Housing not found."}, status=404)

        user = User.objects.filter(id=instance.user_id.id).first()
        if user is None:
            return Response({"detail": "User not found."}, status=404)

        send_mail(
            'Commande rejetée',
            f'Bonjour {instance.firstname} {instance.lastname}, \nVotre réservation du logement : {housing.title} a été Rejetée. Vous pouvez commander un autre pour plus d\'expérience. \nVeuillez vous connecter pour plus d\'informations.',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response(serializer.data)


class HousingOrderCreate(viewsets.ModelViewSet):
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Housing_order.objects.filter(user_id=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        housing_order = serializer.save(user_id=self.request.user)

        card = Card.objects.filter(user_id=self.request.user).first()
        if not card:
            card = Card.objects.create(user_id=self.request.user)

        card.housing_order_id.add(housing_order)

        card_serializer = CardSerializer(card)

        # Envoyer un email
        housing = Housing.objects.get(id=housing_order.housing_id.id)

        provider = Provider.objects.get(id=housing.provider_id.id)
        user = User.objects.get(id=provider.user_id.id)

        send_mail(
            'Nouvelle commande',
            f'Bonjour {user.username}, \nVotre logement {housing.title} vient d\'être commandé. '
            f'Veuillez vous connecter pour consulter les activités.',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response({
            'housing_order': serializer.data,
            'card': card_serializer.data
        }, status=status.HTTP_201_CREATED)

class HousingOrderAccepted(viewsets.ModelViewSet):
    queryset = Housing_order.objects.all()
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        pk = self.kwargs.get('pk')
        instance = Housing_order.objects.filter(id=pk).first()

        if instance is None:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        data = {}

        # if 'order_accepted' in request.data:
        data['order_accepted'] = True

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)  # Validation

        self.perform_update(serializer)

        housing = Housing.objects.filter(id=instance.housing_id.id).first()
        if housing is None:
            return Response({"detail": "Housing not found."}, status=status.HTTP_404_NOT_FOUND)

        user = User.objects.filter(id=instance.user_id.id).first()
        if user is None:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # Envoi de l'email de confirmation
        send_mail(
            'Commande complétée',
            f'Bonjour {instance.firstname} {instance.lastname}, \nVotre réservation pour le logement : {housing.title} est a été acceptée. Vous pouvez faire une nouvelle réservation pour plus d\'expérience. \nVeuillez vous connecter pour plus d\'informations.',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class HousingOrderCompleted(viewsets.ModelViewSet):
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        pk = kwargs['pk']
        instance = Housing_order.objects.filter(id=pk).first()

        if instance is None:
            return Response({"detail": "Not found."}, status=404)

        data = {}

        # if 'completed' in request.data:
        data['completed'] = True

        serializer = self.get_serializer(instance, data=data, partial=partial)

        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        # Envoi de mail
        housing = Housing.objects.filter(id=instance.housing_id.id).first()
        if housing is None:
            return Response({"detail": "Housing not found."}, status=404)

        user = User.objects.filter(id=instance.user_id.id).first()
        if user is None:
            return Response({"detail": "User not found."}, status=404)

        send_mail(
            'Commande achevée',
            f'Bonjour {instance.firstname} {instance.lastname}, \nVotre réservation du logement : {housing.title} a été achevée. Vous pouvez commander un autre pour plus d\'expérience. \nVeuillez vous connecter pour plus d\'informations.',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response(serializer.data)



"""class HousingOrderCreate(generics.ListCreateAPIView):
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Housing_order.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user_id=self.request.user)
        else:
            print(serializer.errors)
"""



class GetHousingOrders(viewsets.ModelViewSet):
    # queryset = Housing_order.objects.all()
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        providers = Provider.objects.filter(user_id=user)

        if providers.exists():
            housing_ids = Housing.objects.filter(provider_id__in=providers.values_list('id', flat=True)).values_list(
                'id', flat=True)
            return Housing_order.objects.filter(housing_id__in=housing_ids)
        else:
            return Housing_order.objects.none()


class GetHousingOrdersStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        providers = Provider.objects.filter(user_id=user)

        if providers.exists():
            housing_ids = Housing.objects.filter(provider_id__in=providers.values_list('id', flat=True)).values_list(
                'id', flat=True)
            orders = Housing_order.objects.filter(housing_id__in=housing_ids)

            # Grouping orders by month
            orders_by_month = orders.annotate(month=TruncMonth('created_at')).values('month').annotate(
                count=Count('id')).order_by('month')

            data = {order['month'].strftime('%Y-%m'): order['count'] for order in orders_by_month}

            return Response(data)
        else:
            return Response({})

class GetCartOrders(viewsets.ModelViewSet):
    # queryset = Housing_order.objects.all()
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Housing_order.objects.filter(user_id=user)

class GetHousingOrdered(viewsets.ModelViewSet):
    # queryset = Housing_order.objects.all()
    serializer_class = HousingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Housing.objects.filter(id=pk)


class CardCreate(viewsets.ModelViewSet):
    serializer_class = HousingOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Housing_order.objects.filter(user_id=self.request.user)


class ManageHousingCreate(generics.ListCreateAPIView):
    serializer_class = ManageHousingSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Manage_housing.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class SubscribeCreate(generics.ListCreateAPIView):
    serializer_class = SubscribeSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Subscribe.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class UserInfoCreate(generics.ListCreateAPIView):
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return User_info.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class OtpCodeCreate(generics.ListCreateAPIView):
    serializer_class = OtpCodeSerializer
    permission_classes = [IsAuthenticated]

    def get_category(self):
        return Otp_code.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)



class Subscribers(viewsets.ModelViewSet):
    # queryset = Subscribe.objects.all()
    serializer_class = SubscribersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk is not None:
            subscribers = Subscribe.objects.filter(company_id=pk)
            return subscribers

class SubscribedUsers(viewsets.ModelViewSet):
    # queryset = Subscribe.objects.all()
    serializer_class = SubscribersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        provider = Provider.objects.filter(user_id=user).first()
        company = Company.objects.filter(provider_id=provider).first()

        return Subscribe.objects.filter(company_id=company).all()





class Subscription(viewsets.ModelViewSet):
    queryset = Subscribe.objects.all()
    serializer_class = SubscribeSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        user = self.request.user

        if user.is_authenticated:
            serializer.save(user_id=user)
        else:
            raise serializers.ValidationError("Utilisateur non authentifié")

