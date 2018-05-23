import React from 'react';
import { connect } from 'react-redux'
import {changeTurn} from '../actions/index.js'
import {ChangeTurnTimer} from './changeTurnTimer.js'
import {GameStatus, PlayerType} from '../helpers/constants.js'


class ChangeTurnSection extends React.Component {



  render() {


    const lineWidth = this.props.gameDrawMeta != null? this.props.gameDrawMeta.lineWidth > 2.5?
                                      2.5 : this.props.gameDrawMeta.lineWidth: null;;

    //let changeButtonClicked = false;
    const autoChangeInSeconds = 5;

    //resetTimer
    if(this.timer !== undefined && this.timer != null
        && this.props.currentGame != null &&
        this.props.currentGame.status === GameStatus.INPROGRESSCHANGETURN
        && (this.props.players[1].turn === false
          || (this.props.players[1].turn === true && this.props.players[1].playerType === PlayerType.HUMAN)))
      {
        this.timer.resetTimer();
      }
    return (this.props.currentGame != null &&
            this.props.currentGame.status === GameStatus.INPROGRESSCHANGETURN
            && (this.props.players[1].turn === false
              || (this.props.players[1].turn === true && this.props.players[1].playerType === PlayerType.HUMAN)))?
        (<div className='change-turn'>
          <button style = {{
                  'height': 40*lineWidth,
                   'width': 40*lineWidth
                }} type="button" onClick= { e => {
                e.preventDefault()
                this.props.onChangeTurnClick()
          }}><span style = {{
                  'position': 'absolute',
                   'top': lineWidth,
                   'left': 15*lineWidth,
                   'fontSize': 20*lineWidth
                }}><ChangeTurnTimer changeTurnAction = {this.props.onChangeTurnClick}
                                    autoChangeInSeconds = {autoChangeInSeconds}
                                    ref = {instance => {this.timer = instance}}/></span>
             <span style = {{
                     'position': 'absolute',
                      'top': 22*lineWidth,
                      'left': 2*lineWidth,
                      'fontSize': 6*lineWidth
                   }}>Change Turn</span>
          </button>
        </div>) : null


  }

}







/*
<ChangeTurnTimer changeTurnAction = {onChangeTurnClick}  autoChangeInSeconds = {autoChangeInSeconds}/>
*/

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame,
    gameDrawMeta: state.gameDrawMeta,
    players: state.players,
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
)(ChangeTurnSection)
