import {ActionTypes,GameStatus} from '../helpers/constants.js'


const guid = () => {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

class Game {
  constructor(gameId,status,winnerPlayerId){
    this.gameId = gameId;
    this.status = status;
    this.winnerPlayerId = winnerPlayerId;
  }

}

const createGame = () =>
{
  return new Game (guid(),GameStatus.INPROGRESS, -1);
}

const CurrentGame = (state = null, action) => {

  switch (action.type) {

    case ActionTypes.RESTARTGAME:
    case ActionTypes.STARTGAME:

      return createGame();

    case ActionTypes.GAMECOMPLETED:

        return new Game( state.gameId,GameStatus.COMPLETED, action.payload.winnerPlayerId);

    case ActionTypes.STONEDROPPED:

      if(action.payload.vacantPositionId >= 1)
      {
          return new Game( state.gameId,GameStatus.INPROGRESSCHANGETURN, action.payload.winnerPlayerId);
      }
      else {
        return state;
      }

    case ActionTypes.CHANGETURN:

        return new Game( state.gameId,GameStatus.INPROGRESS, action.payload.winnerPlayerId);

    default:
      return state;

  }

} ;


export {CurrentGame};
