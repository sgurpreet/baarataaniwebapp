from django.conf.urls import url
from baarataaniapi import views

urlpatterns = [
    url(r'^games/$', views.game_create),
    url(r'^admin/games/$', views.admin_game_getall),
    url(r'^admin/games/(?P<game_id>[a-zA-Z0-9]+)/$', views.admin_game_detail),
]
