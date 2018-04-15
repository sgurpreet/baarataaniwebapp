import {ActionTypes} from '../helpers/constants.js'

class Move {
  constructor(movePlayerId, patternBeforeMove, moveFromPositonId, moveToPositionId,
                vacantPositionId, playerId1Score, playerId2Score){
    this.movePlayerId = movePlayerId
    this.patternBeforeMove = patternBeforeMove
    this.moveFromPositonId = moveFromPositonId
    this.moveToPositionId = moveToPositionId
    this.vacantPositionId = vacantPositionId
    this.playerId1Score = playerId1Score
    this.playerId2Score = playerId2Score
  }

}

const GameMoves = (state = { lastMovePushIndex: -1, moves: []}, action) => {

  switch (action.type) {

    case ActionTypes.RESTARTGAME:
    case ActionTypes.STARTGAME:

      return { lastMovePushIndex: -1, moves: []};

    case ActionTypes.RECORDMOVE:

      const {movePlayerId, patternBeforeMove, moveFromPositonId, moveToPositionId,
                    vacantPositionId, playerId1Score, playerId2Score}
                    = {...action.payload}
      const currentState = {...state}
      currentState.moves.push(new Move(movePlayerId, patternBeforeMove, moveFromPositonId, moveToPositionId,
                    vacantPositionId == null? 0: vacantPositionId, playerId1Score, playerId2Score))

      //console.log('recording for move finished.')
      return currentState

    case ActionTypes.RECORDEDMOVEPUSHED:

        const lastMovePushIndex = action.payload
        return { lastMovePushIndex: lastMovePushIndex, moves: state.moves }

    default:
      return state;

  }



}

export { GameMoves};
