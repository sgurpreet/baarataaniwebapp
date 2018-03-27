import {ActionTypes} from '../helpers/constants.js'

const startGame = (startGame) => {

    return {
        type : ActionTypes.STARTGAME,
        payload : startGame
    }

}


const restartGame = () => {

    return {
        type : ActionTypes.RESTARTGAME,
        payload : null
    }

}

const openStartGameSlider = () => {

    return {
        type : ActionTypes.OPENSTARTGAME,
        payload : null
    }

}

const openSettingSlider = () => {

    return {
        type : ActionTypes.OPENSETTINGFORM,
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




const stoneDropped = (sourcePositionId, sourceStatus, targetPositionId, vacantPositionId) => {

    return {
        type : ActionTypes.STONEDROPPED,
        payload : {sourcePositionId, sourceStatus, targetPositionId, vacantPositionId}
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
        saveGameDrawMetaData
}
