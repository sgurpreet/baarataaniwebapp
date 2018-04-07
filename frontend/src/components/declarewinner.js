import React from 'react';
import { connect } from 'react-redux'

import {GameStatus} from '../helpers/constants.js'


class DeclareWinner extends React.Component {

  renderWinner()
  {
    if(this.props.currentGame!= null
      &&  this.props.currentGame.status === GameStatus.COMPLETED)
    {

      const winner = this.props.players[this.props.currentGame.winnerPlayerId - 1];
      return (
          <div className="row">
            Congratulations {winner.playerName}, you have won the game!
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
