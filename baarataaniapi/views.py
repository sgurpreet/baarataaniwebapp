from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from baarataaniapi.models import Game
from baarataaniapi.serializers import GameSerializer

# Create your views here.
@csrf_exempt
def game_create(request):
    """
    create a new game.
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = GameSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def game_move_create(request):
    """
    create a new game.
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = GameSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


# Create your views here.
@csrf_exempt
@api_view(['GET'])
def admin_game_getall(request):
    """
    Retrieve game(s).
    """
    if request.method == 'GET':
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET', 'DELETE'])
def admin_game_detail(request,game_id):
    """
    Get, delete game.
    """
    try:
        print('game_id')
        game = Game.objects.get(game_id=game_id)
    except Game.DoesNotExist:
        return HttpResponse(status=404)#status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GameSerializer(game)
        return JsonResponse(serializer.data)

    elif request.method == 'DELETE':
        game.delete()
        return HttpResponse(status=204)
