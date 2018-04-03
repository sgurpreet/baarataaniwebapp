from rest_framework import serializers
from baarataaniapi.models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('client_game_id','game_id','created') #__all__

class GameMoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'
