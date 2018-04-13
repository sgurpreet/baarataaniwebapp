import React from 'react';
import { connect } from 'react-redux'
import {changeTurn} from '../actions/index.js'
import {ChangeTurnTimer} from './changeTurnTimer.js'
import {GameStatus} from '../helpers/constants.js'

const changeTurnSection = ( {currentGame, gameDrawMeta, onChangeTurnClick} ) => {
    const lineWidth = gameDrawMeta != null? gameDrawMeta.lineWidth > 2.5? 2.5 : gameDrawMeta.lineWidth: null;;

    //let changeButtonClicked = false;
    const autoChangeInSeconds = 5;
    return (currentGame != null && currentGame.status === GameStatus.INPROGRESSCHANGETURN)?
        (<div className='change-turn'>
          <button style = {{
                  'height': 40*lineWidth,
                   'width': 40*lineWidth
                }} type="button" onClick= { e => {
                e.preventDefault()
                onChangeTurnClick()
          }}><span style = {{
                  'position': 'absolute',
                   'top': lineWidth,
                   'left': 15*lineWidth,
                   'fontSize': 20*lineWidth
                }}><ChangeTurnTimer changeTurnAction = {onChangeTurnClick}  autoChangeInSeconds = {autoChangeInSeconds}/></span>
             <span style = {{
                     'position': 'absolute',
                      'top': 22*lineWidth,
                      'left': 2*lineWidth,
                      'fontSize': 6*lineWidth
                   }}>Change Turn</span>
          </button>
        </div>) : null
}





/*
<ChangeTurnTimer changeTurnAction = {onChangeTurnClick}  autoChangeInSeconds = {autoChangeInSeconds}/>
*/

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame,
    gameDrawMeta: state.gameDrawMeta,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {

      onChangeTurnClick: () => {

          dispatch(changeTurn())

      }
  }

}

export default connect(
  mapStateToProps,mapDispatchToProps
)(changeTurnSection)
