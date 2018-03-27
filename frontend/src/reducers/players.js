import {ActionTypes} from '../helpers/constants.js'


class Player {
  constructor(playerId,playerName,stoneColor,score,pendingStone, turn){
    this.playerId = playerId;
    this.playerName = playerName;
    this.stoneColor = stoneColor;
    this.score = score;
    this.pendingStone = pendingStone;
    this.turn = turn;
  }

}

const createPlayers = (payload) =>
{
  return [
      new Player (1, payload.player1Name === ''? 'Player 1':payload.player1Name , payload.player1Color, 0,12, payload.firstTurn === 1)
      ,
      new Player (2, payload.player2Name === ''? 'Player 2':payload.player2Name, payload.player2Color, 0,12, payload.firstTurn === 2)

  ];
}

const Players = (state = [], action) => {

  switch (action.type) {

    case ActionTypes.STARTGAME:

      return createPlayers(action.payload);


    case ActionTypes.RESTARTGAME:

      return state.map(player => {
        return  new Player(player.playerId,
                                player.playerName,
                                player.stoneColor,
                                0,12,
                                player.playerId === 1? true: false)

      })

    case ActionTypes.STONEDROPPED:

      if(action.payload.vacantPositionId == null)
      return state.map(player => {
        return  new Player(player.playerId,
                                player.playerName,
                                player.stoneColor,
                                player.score,
                                player.pendingStone,
                                player.turn  === true? false : true) // change turn
                              })
      else
        return state.map(player => {
          if(player.playerId === action.payload.sourceStatus)
          {
            return new Player(player.playerId,
                                    player.playerName,
                                    player.stoneColor,
                                    player.score + 1,
                                    player.pendingStone,
                                    player.turn)
          }
          else {
            return new Player(player.playerId,
                                    player.playerName,
                                    player.stoneColor,
                                    player.score,
                                    player.pendingStone - 1,
                                    player.turn)
          }
      })

      case ActionTypes.CHANGETURN:

        return state.map(player => {
            return new Player(player.playerId,
                                      player.playerName,
                                      player.stoneColor,
                                      player.score,
                                      player.pendingStone,
                                      player.turn  === true? false : true)
        })

    default:
      return state;






  }

} ;


export {Player, Players};
