from rest_framework import serializers
from baarataaniapi.models import Game, GameMove

class GameMoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameMove
        fields = ('created','move_from','move_to','player_id',
            'pattern_before_move', 'player_id_1_Score', 'player_id_2_Score')


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('client_game_id','game_id','created')

class GameWithMoveSerializer(serializers.ModelSerializer):
    moves = GameMoveSerializer(many = True)

    class Meta:
        model = Game
        fields = ('client_game_id','game_id','created', 'moves')

    def validate_client_game_id(self, client_game_id):
        gameCount = Game.objects.filter(client_game_id=client_game_id).count()
        if gameCount == 0 :
            raise serializers.ValidationError("Game doesn't exists with id: " + client_game_id)
        if gameCount > 1 :
            raise serializers.ValidationError("More than one games exists with id: " + client_game_id)
        return client_game_id

    def create(self, validated_data):
        moves_data = validated_data.pop('moves')
        client_game_id = validated_data.pop('client_game_id')
        #print(client_game_id)
        #print(Game.objects.filter(client_game_id=client_game_id).count())
        game = Game.objects.filter(client_game_id=client_game_id)[0]
        for move_data in moves_data:
            GameMove.objects.create(game=game, **move_data)
        return game
