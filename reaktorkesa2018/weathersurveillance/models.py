from django.db import models


class Location(models.Model):
	name = models.TextField()
	latitude = models.FloatField()
	longitude = models.FloatField()

	@property
	def current_temperature(self):
		return self.measurements.latest('time')

	@property
	def maximum_temperature(self):
		return self.measurements.order_by('temperature').last()

	@property
	def minimum_temperature(self):
		return self.measurements.order_by('temperature').first()

class Measurement(models.Model):
	location = models.ForeignKey(Location,related_name="measurements",on_delete=models.CASCADE)
	temperature = models.IntegerField()
	time = models.DateTimeField(auto_now=True)