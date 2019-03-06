import {ActionTypes} from '../helpers/constants.js'
import {generateGuid, generatePattern} from '../helpers/utils.js'

const startGame = (startGame) => {

  const clientGameId = generateGuid();

  return dispatch => {
      const headers = {"Content-Type": "application/json"};
      const method = "POST"
      const body = JSON.stringify({"client_game_id": clientGameId})
      //console.log(body)
      return fetch("/games/", {headers, method: method, body })
          .then(res => res.json())
          .then(game => {
              return dispatch({
                type : ActionTypes.STARTGAME,
                payload : { ...startGame, id: game.game_id, clientGameId: game.client_game_id}
              })
          })
  }
}


const restartGame = () => {

  const clientGameId = generateGuid();

  return dispatch => {
      const headers = {"Content-Type": "application/json"};
      const method = "POST"
      const body = JSON.stringify({"client_game_id": clientGameId})
      //console.log(body)
      return fetch("/games/", {headers, method: method, body })
          .then(res => res.json())
          .then(game => {
              return dispatch({
                type : ActionTypes.RESTARTGAME,
                payload : { id: game.game_id, clientGameId: game.client_game_id}
              })
          })
  }

}

const openStartGameSlider = () => {

    return {
        type : ActionTypes.OPENSTARTGAME,
        payload : null
    }

}

const openRestartGameSlider = () => {

    return {
        type : ActionTypes.OPENRESTARTGAME,
        payload : null
    }

}

const openSettingSlider = () => {

    return {
        type : ActionTypes.OPENSETTINGFORM,
        payload : null
    }

}

const openHelpSlider = () => {

  return {
      type : ActionTypes.OPENHELPFORM,
      payload : null
  }

}

const openedSlider = () => {

    return {
        type : ActionTypes.OPENEDSLIDER,
        payload : null
    }

}

const closeSlider = () => {

    return {
        type : ActionTypes.CLOSESLIDER,
        payload : null
    }

}

const isStoneDragging = () => {

    return {
        type : ActionTypes.ISDRAGGING,
        payload : null
    }

}

const inValidMoveAttempted = (sourceStatus, sourcePositionId, targetPositionId) => {

    return {
        type : ActionTypes.INVALIDMOVEATTEMPT,
        payload : {sourceStatus, sourcePositionId, targetPositionId}
    }

}

const moveActionCompleted = () => {

    return {
        type : ActionTypes.MOVEACTIONCOMPLETED,
        payload : null
    }

}

const stoneDropped = (sourcePositionId, sourceStatus, targetPositionId,
        vacantPositionId, turnMoves = null) => {

  return (dispatch, getState) => {
    dispatch(
      {
          type : ActionTypes.STONEDROPPED,
          payload : {sourcePositionId, sourceStatus, targetPositionId, vacantPositionId, turnMoves}
      }
    )

    const {players, stoneHolders} = getState()
    const patternBeforeMove = generatePattern(stoneHolders)

    const move = { movePlayerId: sourceStatus,
            patternBeforeMove: patternBeforeMove,
            moveFromPositonId: sourcePositionId,
            moveToPositionId: targetPositionId,
            vacantPositionId: vacantPositionId,
            playerId1Score: players[0].score,
            playerId2Score: players[1].score
          }
    dispatch(
      {
          type : ActionTypes.RECORDMOVE,
          payload : {...move}
      }
    )

    if(vacantPositionId != null)
    {
      setTimeout(() => {
            const {gameMoves, currentGame} = getState()
            const startOfPendingMoveIndex = gameMoves.lastMovePushIndex + 1
            const lastMovePushIndex = gameMoves.moves.length -1
            //console.log(startOfPendingMoveIndex,lastMovePushIndex)
            let movesToBePushed = []
            for(let index = startOfPendingMoveIndex; index <= lastMovePushIndex; index++ )
              movesToBePushed.push( {move_from: gameMoves.moves[index].moveFromPositonId,
                                     move_to: gameMoves.moves[index].moveToPositionId,
                                     player_id: gameMoves.moves[index].movePlayerId,
                                     pattern_before_move: gameMoves.moves[index].patternBeforeMove,
                                     player_id_1_Score: gameMoves.moves[index].playerId1Score,
                                     player_id_2_Score: gameMoves.moves[index].playerId2Score,
                                     })

            const headers = {"Content-Type": "application/json"};
            const method = "POST"
            const body = JSON.stringify({game_id: currentGame.id,
                                         client_game_id: currentGame.gameId,
                                         moves: movesToBePushed} )
            //console.log(body)
            return fetch("/games/moves/", {headers, method: method, body })
                .then(res => res.json())
                .then(game => {
                    return dispatch({
                      type : ActionTypes.RECORDEDMOVEPUSHED,
                      payload : lastMovePushIndex
                    })
                })


          }, 100);

      }

  }
}

const gameCompleted = (winnerPlayerId) => {

    return {
        type : ActionTypes.GAMECOMPLETED,
        payload : {winnerPlayerId}
    }

}


const changeTurn = () => {

    return {
        type : ActionTypes.CHANGETURN,
        payload : {}
    }

}

const saveGameDrawMetaData = (gameDrawMeta) => {

    return {
        type : ActionTypes.SAVEDRAWMETADATA,
        payload : gameDrawMeta
    }

}

export {startGame, restartGame, stoneDropped,gameCompleted,changeTurn,
        openStartGameSlider, openSettingSlider, openedSlider, closeSlider,
        saveGameDrawMetaData, openHelpSlider, isStoneDragging, openRestartGameSlider,
        inValidMoveAttempted, moveActionCompleted
}
