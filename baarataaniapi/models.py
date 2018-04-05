from django.db import models
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator


def increment_game_number():
  last_game = Game.objects.all().order_by('id').last()
  if not last_game:
    return 'GM' + str(datetime.date.today().year) + str(datetime.date.today().month).zfill(2) + '000000'
  game_id = last_game.game_id
  game_int = int(game_id[9:15])
  new_game_int = game_int + 1
  new_game_id = 'GM' + str(str(datetime.date.today().year)) + str(datetime.date.today().month).zfill(2) + str(new_game_int).zfill(6)
  return new_game_id

class Game(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    game_id = models.CharField(max_length = 25, default = increment_game_number, editable=False)
    client_game_id = models.CharField(max_length=100, default='client_id_not_set')

    class Meta:
        ordering = ('created',)

class GameMove(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    move_from = models.IntegerField(validators=[MaxValueValidator(25), MinValueValidator(1)])
    move_to = models.IntegerField(validators=[MaxValueValidator(25), MinValueValidator(1)])
    player_id = models.IntegerField(validators=[MaxValueValidator(2), MinValueValidator(1)])
    pattern_before_move = models.CharField(max_length=25)
    game = models.ForeignKey(Game, related_name='moves', on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)
