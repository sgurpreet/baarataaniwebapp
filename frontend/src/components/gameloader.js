import React from 'react';
import { connect } from 'react-redux'

import {StoneHolderStatus} from '.././helpers/constants.js'
import StoneHolder from './stoneholder.js'
import Stone from './stone.js'


const getPlayer = (status, players) => {
  let player = null;
  switch (status) {
    case StoneHolderStatus.PLAYER1:
    case StoneHolderStatus.PLAYER2:
      player = players.filter(player => player.playerId === status)[0]
      break;
    default:
  }

  return player;

}

const stoneHolderFn = (stoneHolder, player, drawMetaData, actualLineWidth) => {
  return (
        <StoneHolder key = {stoneHolder.positionId} index = {stoneHolder.positionId}
                    positionId = {stoneHolder.positionId} status = {stoneHolder.status}
                    drawMetaData = {drawMetaData} actualLineWidth = {actualLineWidth}>
          {
            player != null && <Stone player ={player} stoneHolder = {stoneHolder} lineWidth={drawMetaData.lineWidth} />
          }
        </StoneHolder>
      );
}

class GameLoader extends React.Component {


  gameLoader() {
    const allPlayers = this.props.players;

    let drawMetaData = this.props.drawMetaData;
    drawMetaData.lineWidth = drawMetaData.lineWidth < 3? 3 : drawMetaData.lineWidth ;

    const stoneHolders = this.props.stoneHolders.map((stoneHolder) =>
                              stoneHolderFn(stoneHolder,getPlayer(stoneHolder.status,allPlayers),
                                      drawMetaData, this.props.drawMetaData.lineWidth ));

    return (
      <span>
        {stoneHolders}
      </span>
    );

  }

  render() {

      return this.gameLoader();

  }

}

const mapStateToProps = state => {
  return {
    stoneHolders: state.stoneHolders,
    players: state.players,
    currentGame: state.currentGame,
    gameMoves: state.gameMoves,
  }
}

export default connect(
  mapStateToProps
)(GameLoader)
