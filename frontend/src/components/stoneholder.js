import React from 'react';

import PropTypes from 'prop-types';
import {ItemTypes,GameStatus} from '.././helpers/constants.js'
import { DropTarget } from 'react-dnd';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {stoneDropped,gameCompleted, inValidMoveAttempted} from '../actions/index.js'
import {canMakeMove, moveScorePosition,isGameCompleted} from '../actions/game.js'

const stoneTarget = {
  canDrop(props, monitor){

    //const source = monitor.getItem();

    //console.log("Can Drop Check.");

    //console.log(props.dragDropState.isDragging)
    if(props.dragDropState.isDragging === false)
      return false;

    //console.log("Can Drop Check.");

    return true;

  },
  drop(props, monitor) {

    //console.log("Dropped");

    const source  = monitor.getItem();

    const isValidMove = canMakeMove(source.player, props.stoneHolders, source.stoneHolder.positionId,
              source.stoneHolder.status, props.positionId, props.currentGame.status, props.gameMoveState)

    if(isValidMove === false)
    {
      props.inValidMoveAttempted(source.stoneHolder.status, source.stoneHolder.positionId, props.positionId);

      return;
    }

    //console.log("Valid Move");

    const vacantPositionId = moveScorePosition(props.stoneHolders, source.stoneHolder.positionId,
              source.stoneHolder.status, props.positionId, props.currentGame.status, props.gameMoveState)

      props.stoneDropped(source.stoneHolder.positionId, source.stoneHolder.status, props.positionId, vacantPositionId);

    if (vacantPositionId !=  null)
    {
      const {gameStatus, winnerPlayerId} = isGameCompleted(props.stoneHolders, vacantPositionId);

      if(gameStatus === GameStatus.COMPLETED)
      {
        props.gameCompleted(winnerPlayerId);
      }
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

  componentDidUpdate()
  {

    if(this.props.positionId === this.props.gameMoveState.lastMoveSourcePositionId)
      {


        let stoneHolder = document.querySelectorAll("div[position='" +
                                      this.props.positionId +"']")[0]

        //console.log(stoneHolder);
        stoneHolder.classList.remove('stone-move');
        //console.log(stoneHolder);
        //stoneHolder.style.removeProperty('transform');
        //stoneHolder.style.removeProperty('--stone-translate-yAxis');
    }

  }

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

    const top =  verticalGap * Math.trunc((this.props.positionId-1)/5) + 10 - stoneHolderHeight/4 - lineWidth/2;
    const left = horizontalGap * Math.trunc((this.props.positionId-1)%5) - stoneHolderWidth/4 -lineWidth/2;

    return connectDropTarget(

      <div position= {this.props.positionId}
                    xaxis = {(left).toString()}
                    yaxis = {(top).toString()}
                    style = {{ 'top':(top).toString().concat('px')
                                     ,'left':(left).toString().concat('px')
                                     ,'height': stoneHolderHeight
                                     ,'width': stoneHolderWidth
                                     ,'backgroundColor': isOver ? 'var(--stone-holder-background-color-over)': 'transparent'}}
                        className="stone-holder">

          {this.props.children}

      </div>
      );


  }

  shouldComponentUpdate(nextProps, nextState )
  {
    // Not working well with touch
    /*if(nextProps.status !== this.props.status
      || this.props.positionId === this.props.gameMoveState.lastMoveTargetPositionId
      || (nextProps.isOver !== this.props.isOver))
      return true;
    else
      return false;*/
      return true;
  }

  render() {

      const { connectDropTarget, isOver} = this.props;

      //console.log('Holder: ' + this.props.positionId);
      //console.log('isOver: ' + this.props.isOver);

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
    currentGame: state.currentGame,
    gameMoveState: state.gameMoveState,
    dragDropState: state.dragDropState
  }
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({stoneDropped: stoneDropped,
                              gameCompleted: gameCompleted,
                              inValidMoveAttempted: inValidMoveAttempted}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(ItemTypes.STONE, stoneTarget, collect)(StoneHolder));
