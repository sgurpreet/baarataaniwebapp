import {ActionTypes,GameStatus} from '../helpers/constants.js'




class Game {
  constructor(gameId,status,winnerPlayerId, id){
    this.gameId = gameId;
    this.status = status;
    this.winnerPlayerId = winnerPlayerId;
    this.id = id;
  }

}

const createGame = (id,clientGameId) =>
{
  return new Game (clientGameId,GameStatus.INPROGRESS, -1, id);
}

const CurrentGame = (state = null, action) => {

  switch (action.type) {

    case ActionTypes.RESTARTGAME:
    case ActionTypes.STARTGAME:

      return createGame(action.payload.id, action.payload.clientGameId);

    case ActionTypes.GAMECOMPLETED:

        return new Game( state.gameId,GameStatus.COMPLETED,
                      action.payload.winnerPlayerId, state.id);

    case ActionTypes.STONEDROPPED:

      if(action.payload.vacantPositionId >= 1)
      {
          return new Game( state.gameId,GameStatus.INPROGRESSCHANGETURN,
                        action.payload.winnerPlayerId, state.id);
      }
      else {
        return state;
      }

    case ActionTypes.CHANGETURN:

        return new Game( state.gameId,GameStatus.INPROGRESS,
                      action.payload.winnerPlayerId, state.id);

    default:
      return state;

  }

} ;


export {CurrentGame};
