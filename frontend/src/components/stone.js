import React from 'react';

import PropTypes from 'prop-types';
import {ItemTypes} from '.././helpers/constants.js'
import { DragSource } from 'react-dnd';


const stoneSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.player.turn;
  },
  beginDrag(props) {
    const { stoneHolder } = props;
    return {stoneHolder};
  }
};

//sourceStoneDocker: props.stoneDocker

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class Stone extends React.Component {

  render() {
      // eslint-disable-next-line
      const { connectDragSource, isDragging, stoneHolder, player, lineWidth} = this.props;



      const radialGradient = 'radial-gradient(circle at ' + 2.5*lineWidth + 'px ' +
                              2.5*lineWidth + 'px, ' + player.stoneColor + ', #000)'
      //console.log('Stone Position: ' + stoneHolder.positionId);
      return connectDragSource(
        <figure  style = {{ 'display': 'inline-block',
                            'borderRadius': '100%',
                            'height': 8*lineWidth,
                            'width': 8*lineWidth,
                            'margin': 0,
                            'marginLeft': 4*lineWidth,
                            'verticalAlign': 'middle',
                            'background':radialGradient,
                        opacity: isDragging ? 0.5 : 1 }}
              stoneid = {player.stoneId}
              playerid = {player.playerId}></figure>
      );

  }

}
Stone.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.STONE, stoneSource, collect)(Stone);
