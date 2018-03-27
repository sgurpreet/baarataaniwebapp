import React from 'react';

import PropTypes from 'prop-types';
import {ItemTypes,GameStatus} from '.././helpers/constants.js'
import { DropTarget } from 'react-dnd';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {stoneDropped,gameCompleted} from '../actions/index.js'
import {canMakeMove, moveScorePosition,isGameCompleted} from '../actions/game.js'

const stoneTarget = {
  canDrop(props, monitor){

    const source = monitor.getItem();

    //console.log("Can Drop Check.");

    return canMakeMove(props.stoneHolders, source.stoneHolder.positionId,
              source.stoneHolder.status, props.positionId, props.currentGame.status)

  },
  drop(props, monitor) {
    //console.log("Dropped");

    const source  = monitor.getItem();

    //console.log("Dropped1");

    const vacantPositionId = moveScorePosition(props.stoneHolders, source.stoneHolder.positionId,
              source.stoneHolder.status, props.positionId, props.currentGame.status)

      props.stoneDropped(source.stoneHolder.positionId, source.stoneHolder.status, props.positionId, vacantPositionId);

    const {gameStatus, winnerPlayerId} = isGameCompleted(props.stoneHolders);

    if(gameStatus === GameStatus.COMPLETED)
    {
      props.gameCompleted(winnerPlayerId);
    }

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}



class StoneHolder extends React.Component {

  renderStoneHolder(isOver, connectDropTarget) {

    const lineWidth       = this.props.drawMetaData.lineWidth; // eslint-disable-next-line
    const margin          = this.props.drawMetaData.margin;// eslint-disable-next-line
    const horizontalGap   = this.props.drawMetaData.horizontalGap;// eslint-disable-next-line
    const verticalGap     = this.props.drawMetaData.verticalGap;// eslint-disable-next-line
    const availableHeight = this.props.drawMetaData.availableHeight;// eslint-disable-next-line
    const availableWidth  = this.props.drawMetaData.availableWidth;// eslint-disable-next-line
    // eslint-disable-next-line
    const actualLineWidth  = this.props.actualLineWidth;

    const stoneHolderHeight =16*lineWidth;
    const stoneHolderWidth = 16*lineWidth;

    const top =  verticalGap * Math.trunc((this.props.positionId-1)/5) + 10 - stoneHolderHeight/4 - lineWidth;
    const left = horizontalGap * Math.trunc((this.props.positionId-1)%5) - stoneHolderWidth/4-lineWidth;

    return connectDropTarget(

      <div position= {this.props.positionId} style = {{ 'top':(top).toString().concat('px')
                                     ,'left':(left).toString().concat('px')
                                     ,'height': stoneHolderHeight
                                     ,'width': stoneHolderWidth
                                     ,'backgroundColor': isOver ? 'var(--stone-holder-background-color-over)': 'transparent'}}
                        className="stone-holder">

          {this.props.children}

      </div>
      );


  }

  render() {

      const { connectDropTarget, isOver} = this.props;

      //console.log('Holder: ' + this.props.positionId);

      return this.renderStoneHolder(isOver, connectDropTarget);

  }

}

StoneHolder.propTypes = {

  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    stoneHolders: state.stoneHolders,
    currentGame: state.currentGame
  }
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({stoneDropped: stoneDropped, gameCompleted: gameCompleted}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(ItemTypes.STONE, stoneTarget, collect)(StoneHolder));
