from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()
router.register(r'location', LocationViewSet)
router.register(r'measurement',MeasurementViewSet)
urlpatterns = [
	path(r'api/',include(router.urls)),
    path(r'',TemplateView.as_view(template_name="weathersurveillance/index.html"))
]
