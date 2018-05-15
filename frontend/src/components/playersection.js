import React from 'react';
import { connect } from 'react-redux'
import {Node} from '../actions/forwardLookTree.js'
import {getNextMove} from '../actions/alphaBetaMinMax.js'

class PlayerSection extends React.Component {

  render() {

    const lineWidth = this.props.gameDrawMeta.lineWidth < 3? 3 : this.props.gameDrawMeta.lineWidth;
    const radialGradient = 'radial-gradient(circle at ' + 2.5*lineWidth + 'px ' +
                            2.5*lineWidth + 'px, ' + this.props.stoneColor + ', #000)'

      const cardStlyle = this.props.turn === true? 'card card-shadow' : 'card';

      return (
        <div className={cardStlyle}>
          <div style={{'height': 10*lineWidth }} className="card-header">

            <b style={{'marginLeft': 2*lineWidth,
                        'marginTop': 2*lineWidth}}>{this.props.playerName}</b>

            <figure  style = {{ 'display': 'block',
                                'borderRadius': '100%',
                                'height': 8*lineWidth,
                                'width': 8*lineWidth,
                                'margin': 0,
                                'marginTop': lineWidth,
                                'marginRight': 2*lineWidth,
                                'background':radialGradient}}
                  playerid = {this.props.playerId}></figure>
          </div>
          <div style={{'marginLeft': 2*lineWidth,
                       'marginRight': 2*lineWidth}} className="card-body">
            <ul>
              <li style={{'paddingBottom': lineWidth}}><b>Score:   </b>{this.props.score}</li>
              <li><b>Pending: </b>{this.props.pendingStone}</li>
            </ul>

            <input type="button" onClick={() => {
                  const depth = 5;
                  Node.instanceCounter = 0;
                  let tree = Node.createNode(depth+1, 0, -1, null, null);
                  Node.generateTree(depth, this.props.playerId, this.props.stoneHolders,0, tree, 0);
                  console.log(Node.instanceCounter);
                  console.log(tree);
                  let nextMove = getNextMove(depth, tree);
                  console.log(nextMove);
                  for(let index =0; index < nextMove.moves.length; index++)
                  {
                    console.log(nextMove.moves[index]);
                  }
                }} value="Generate Tree"/>

          </div>
        </div>
      );
  }

}

const mapStateToProps = state => {
  return {
    gameDrawMeta: state.gameDrawMeta,
    stoneHolders: state.stoneHolders
  }
}

export default connect(
  mapStateToProps
)(PlayerSection)
