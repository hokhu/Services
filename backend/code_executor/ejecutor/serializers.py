
from rest_framework import serializers

from .models import TuModelo


class TuModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TuModelo
        fields = '__all__'
