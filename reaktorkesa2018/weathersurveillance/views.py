from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from rest_framework import permissions


class LocationViewSet(ModelViewSet):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Location.objects.all();
	serializer_class = LocationSerializer;

class MeasurementViewSet(ModelViewSet):
	queryset = Measurement.objects.all();
	serializer_class = MeasurementSerializer;




