from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from baarataaniapi.models import Game, GameMove
from baarataaniapi.serializers import GameSerializer, GameMoveSerializer, GameWithMoveSerializer

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.decorators import authentication_classes, permission_classes


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
    Save a game moves.
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        serializer = GameWithMoveSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


# Create your views here.
#@csrf_exempt
@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def admin_game_getall(request):
    """
    Retrieve game(s).
    """
    if request.method == 'GET':
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return JsonResponse(serializer.data, safe=False)

#@csrf_exempt
@api_view(['GET', 'DELETE'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def admin_game_detail(request,game_id):
    """
    Get, delete game.
    """
    try:
        game = Game.objects.get(game_id=game_id)
    except Game.DoesNotExist:
        return HttpResponse(status=404)#status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GameSerializer(game)
        return JsonResponse(serializer.data)

    elif request.method == 'DELETE':
        game.delete()
        return HttpResponse(status=204)

#@csrf_exempt
@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def admin_game_get_all_with_moves(request):
    """
    Retrieve game(s).
    """
    print('game_id1')
    if request.method == 'GET':
        games = Game.objects.all()
        serializer = GameWithMoveSerializer(games, many=True)
        return JsonResponse(serializer.data, safe=False)


#@csrf_exempt
@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def admin_game_detail_with_moves(request,game_id):
    """
    Get game.
    """
    try:
        game = Game.objects.get(game_id=game_id)
    except Game.DoesNotExist:
        return HttpResponse(status=404)#status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GameWithMoveSerializer(game)
        return JsonResponse(serializer.data)
