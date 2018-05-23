import React from 'react';
import { connect } from 'react-redux'
import {Node} from '../actions/forwardLookTree.js'
import {getNextMove} from '../actions/alphaBetaMinMax.js'
// eslint-disable-next-line
import {PlayerType, GameStatus, StoneHolderStatus} from '.././helpers/constants.js'

import {bindActionCreators} from 'redux';
// eslint-disable-next-line
import {stoneDropped,gameCompleted, changeTurn} from '../actions/index.js'
// eslint-disable-next-line
import {canMakeMove, moveScorePosition,isGameCompleted} from '../actions/game.js'

/*
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
*/

let isNewTurn = true;

class PlayComputerTurn extends React.Component {

  componentDidUpdate()
  {
    const stoneHolders = this.props.stoneHolders;

    const lineWidth    = this.props.gameDrawMeta.lineWidth; // eslint-disable-next-line
    const horizontalGap   = this.props.gameDrawMeta.horizontalGap;// eslint-disable-next-line
    const verticalGap     = this.props.gameDrawMeta.verticalGap;// eslint-disable-next-line

    const currentGame   = this.props.currentGame;
    const gameMoveState = this.props.gameMoveState;
    const stoneDropped  = this.props.stoneDropped;
    const gameCompleted = this.props.gameCompleted;
    const changeTurn =    this.props.changeTurn;

    let moves = null;
    let moveIndex = 0;

    if(this.props.players.length === 0)
      return;

    const player = this.props.players.find( _ => _.turn === true);


    if(isNewTurn === true) // new moves
    {
      if(player.playerType === PlayerType.COMPUTER
        && player.turn === true)
      {
        const depth = 5;
        Node.instanceCounter = 0;
        let tree = Node.createNode(depth+1, 0, -1, null, null);
        Node.generateTree(depth, player.playerId, stoneHolders,0, tree, 0);
        //console.log(Node.instanceCounter);
        //console.log(tree);
        let nextMove = getNextMove(depth, tree);
        //console.log(nextMove);

        moves = nextMove.moves;

        isNewTurn = false;
      }

    }
    // get moves from game move state
    else if(gameMoveState.turnMoves != null &&
        gameMoveState.turnMoves.length > 1 &&
        gameMoveState.turnScoreCount < gameMoveState.turnMoves.length)
    {
      moves = gameMoveState.turnMoves;
      moveIndex = gameMoveState.turnScoreCount;
    }

    if(moves != null)
    {

      setTimeout(() => {

        const move = moves[moveIndex];

        // eslint-disable-next-line
        const isValidMove = canMakeMove(player, stoneHolders,
                      move.sourcePositionId,
                      stoneHolders[move.sourcePositionId-1].status,
                      move.targetPositionId,
                      currentGame.status,
                      gameMoveState)

        if(isValidMove)
        {

          let sourceStoneHolder = document.querySelectorAll("div[position='" + move.sourcePositionId +"']")[0]


          const targetTop =  verticalGap * Math.trunc((move.targetPositionId-1)/5) + 10 -
                                                (16*lineWidth)/4 - lineWidth/2;
          const targetLeft = horizontalGap * Math.trunc((move.targetPositionId-1)%5)
                                      - (16*lineWidth)/4 -lineWidth/2;


          sourceStoneHolder.style.setProperty('--stone-translate-xAxis',
                          (targetLeft - sourceStoneHolder.getAttribute('xaxis')) + "px");

          sourceStoneHolder.style.setProperty('--stone-translate-yAxis',
                          (targetTop - sourceStoneHolder.getAttribute('yaxis')) + "px");

          sourceStoneHolder.classList.add('stone-move');

          const vacantPositionId = moveScorePosition(stoneHolders,
                        move.sourcePositionId,
                        stoneHolders[move.sourcePositionId-1].status,
                        move.targetPositionId,
                        currentGame.status,
                        gameMoveState)

          setTimeout(() => {

            stoneDropped(move.sourcePositionId,
                          stoneHolders[move.sourcePositionId-1].status,
                          move.targetPositionId,
                          vacantPositionId, moves);

            if(moves.length === moveIndex + 1)
            {
                isNewTurn = true;

                if(vacantPositionId != null)
                {
                  setTimeout(() => {
                      changeTurn();
                    }, 50);
                }

            }

            //Check for winner
            if (vacantPositionId !=  null)
            {
              const {gameStatus, winnerPlayerId} = isGameCompleted(stoneHolders, vacantPositionId);

              if(gameStatus === GameStatus.COMPLETED)
              {
                gameCompleted(winnerPlayerId);
              }
            }

              }, 1005);


        }

      }, 500);
    }

  }

  findMoves(playerId, stoneHolders){

    const depth = 5;
    Node.instanceCounter = 0;
    let tree = Node.createNode(depth+1, 0, -1, null, null);
    Node.generateTree(depth, playerId, stoneHolders,0, tree, 0);
    //console.log(Node.instanceCounter);
    //console.log(tree);
    let nextMove = getNextMove(depth, tree);
    console.log(nextMove);

    return nextMove.moves;

  }

  render() {

    return null;
  }

}




const mapStateToProps = state => {
  return {
    gameDrawMeta: state.gameDrawMeta,
    stoneHolders: state.stoneHolders,
    players: state.players,
    currentGame: state.currentGame,
    gameMoveState: state.gameMoveState,
    dragDropState: state.dragDropState
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({stoneDropped: stoneDropped,
                              gameCompleted: gameCompleted,
                              changeTurn: changeTurn}, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PlayComputerTurn)
