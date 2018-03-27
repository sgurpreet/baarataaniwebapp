import React from 'react';

import PlayerSection from './playersection.js'
import { connect } from 'react-redux'

const playersBoxList = ( {players }) => (
    players.map(function(player, index){
        return <PlayerSection key={index} {...player}/>
      })
)

const mapStateToProps = state => {
  return {
    players: state.players
  }
}

export default connect(
  mapStateToProps
)(playersBoxList)
