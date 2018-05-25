import React from 'react';
import { connect } from 'react-redux'

import {GameStatus, PlayerType} from '../helpers/constants.js'


class DeclareWinner extends React.Component {

  renderWinner()
  {
    if(this.props.currentGame!= null
      &&  this.props.currentGame.status === GameStatus.COMPLETED)
    {

      const winner = this.props.players[this.props.currentGame.winnerPlayerId - 1];
      //const oponent = this.props.players[this.props.currentGame.winnerPlayerId%2];

      const  message = winner.playerType === PlayerType.HUMAN?
            'Congratulations ' +  winner.playerName+ ', you have won the game!'
            : 'Computer Won, Better luck next time!';

      return (
          <div style ={{'marginTop': '15px', 'fontSize': '1.5em', 'fontWeight': 'bold'}} className="row">
            {message}
          </div>
        )
    }
    else {
      return null;
    }
  }

  render() {

    return this.renderWinner();

  }

}

const mapStateToProps = state => {
  return {
    players: state.players,
    currentGame: state.currentGame
  }
}

export default connect(
  mapStateToProps
)(DeclareWinner)
