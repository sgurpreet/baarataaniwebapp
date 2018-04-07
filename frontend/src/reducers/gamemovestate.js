import {ActionTypes} from '../helpers/constants.js'

const initState =
{
  lastMovePlayerId: null,
  lastMoveSourcePositionId: null,
  lastMoveTargetPositionId: null,
  turnScoreCount: 0,
}

const GameMoveState = (state = initState, action) => {

  switch (action.type) {

    case ActionTypes.STONEDROPPED:

      console.log('turn ')
      return {
        lastMovePlayerId : action.payload.sourceStatus,
        lastMoveSourcePositionId : action.payload.sourcePositionId,
        lastMoveTargetPositionId : action.payload.targetPositionId,
        turnScoreCount : (action.payload.vacantPositionId != null &&
                  (action.payload.sourcePositionId === state.lastMoveTargetPositionId
                    || state.turnScoreCount === 0))?  state.turnScoreCount + 1 : 0
      }

    case ActionTypes.CHANGETURN:
      return initState;

    default:
      return state;

  }



}

export { GameMoveState };
