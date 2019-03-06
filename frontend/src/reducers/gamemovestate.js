import {ActionTypes, LastMoveState} from '../helpers/constants.js'

const initState =
{
  lastMovePlayerId: null,
  lastMoveSourcePositionId: null,
  lastMoveTargetPositionId: null,
  turnScoreCount: 0,
  turnMoves: [],
  lastMoveState: LastMoveState.NoMove
}

const GameMoveState = (state = initState, action) => {

  switch (action.type) {

    case ActionTypes.INVALIDMOVEATTEMPT:
      return {...state, lastMoveState: LastMoveState.InValidMove }

    case ActionTypes.MOVEACTIONCOMPLETED:
      return {...state, lastMoveState: LastMoveState.MoveActionCompleted }

    case ActionTypes.STONEDROPPED:

      //console.log('turn ')
      return {
        lastMovePlayerId : action.payload.sourceStatus,
        lastMoveSourcePositionId : action.payload.sourcePositionId,
        lastMoveTargetPositionId : action.payload.targetPositionId,
        turnScoreCount : (action.payload.vacantPositionId != null &&
                  (action.payload.sourcePositionId === state.lastMoveTargetPositionId
                    || state.turnScoreCount === 0))?  state.turnScoreCount + 1 : 0,
        turnMoves: action.payload.turnMoves, //used for computer player,
        lastMoveState: LastMoveState.ValidMove
      }

    case ActionTypes.RESTARTGAME:
    case ActionTypes.STARTGAME:
    case ActionTypes.CHANGETURN:
      return initState;

    default:
      return state;

  }



}

export { GameMoveState };
