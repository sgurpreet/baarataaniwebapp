import React from 'react';
import { connect } from 'react-redux'

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


          </div>
        </div>
      );
  }

}

const mapStateToProps = state => {
  return {
    gameDrawMeta: state.gameDrawMeta,
  }
}

export default connect(
  mapStateToProps
)(PlayerSection)
