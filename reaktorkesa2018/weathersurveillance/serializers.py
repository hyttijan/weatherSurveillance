from rest_framework import serializers
from .models import *

class MeasurementSerializer(serializers.ModelSerializer):
	time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
	class Meta:
		model = Measurement
		fields = ['location','temperature','time']

class LocationSerializer(serializers.ModelSerializer):
	current_temperature = MeasurementSerializer(required=False)
	maximum_temperature = MeasurementSerializer(required=False)
	minimum_temperature = MeasurementSerializer(required=False)

	class Meta:
		model = Location
		fields = ['id','name', 'latitude', 'longitude','current_temperature', 'maximum_temperature','minimum_temperature']

