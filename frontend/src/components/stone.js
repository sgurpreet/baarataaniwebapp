import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {ItemTypes, PlayerType} from '.././helpers/constants.js'
import { DragSource } from 'react-dnd';
import {isStoneDragging} from '../actions/index.js'
import { getEmptyImage } from 'react-dnd-html5-backend'


const stoneSource = {
  canDrag(props) {
    // You can disallow drag based on props

    if(props.player.playerType === PlayerType.COMPUTER)
      return false;

    return props.player.turn;
  },
  beginDrag(props) {
    //console.log('IsDragging');
    props.isStoneDragging();
    const { stoneHolder, player, lineWidth } = props;
    return {stoneHolder, player, lineWidth};
  }
};

//sourceStoneDocker: props.stoneDocker

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}


class Stone extends React.Component {

  componentDidMount() {
		// Use empty image as a drag preview so browsers don't draw it
		// and we can draw whatever we want on the custom drag layer instead.
		this.props.connectDragPreview(getEmptyImage(), {
			// IE fallback: specify that we'd rather screenshot the node
			// when it already knows it's being dragged so we can hide it with CSS.
			captureDraggingState: true,
		})
	}


  shouldComponentUpdate(nextProps, nextState )
  {
    // Not working well with touch
    /*if(nextProps.status !== this.props.status
      || nextProps.isDragging === true
      || this.props.isDragging === true)
      return true;
    else
      return false;*/
    return true;
  }

  render() {

      //console.log('Stone Holder Called.');
      //console.log('isDragging: ' + this.props.isDragging);
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
                        opacity: isDragging ? 0.5 : 1,
                        transform: isDragging ? 'scale(1.0)' : 'scale(1.0)'
                      }}
              stoneid = {player.stoneId}
              playerid = {player.playerId}></figure>
      );

  }

}
Stone.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    dragDropState: state.dragDropState,
  }
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({isStoneDragging: isStoneDragging}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DragSource(ItemTypes.STONE, stoneSource, collect)(Stone));
