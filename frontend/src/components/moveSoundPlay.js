import React from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {moveActionCompleted} from '../actions/index.js'
import {LastMoveState} from '../helpers/constants.js'


class MovePlaySound extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        previousMoveTargetPositionId: -1
      };

  }

  inValidMoveSound()
  {
    const ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
    const ctx = new ctxClass();

    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    o.type="sine"
    g.connect(ctx.destination)
    o.start(0)
    setTimeout(function () {
            if (o.stop) o.stop();
        }, 50);

  }

  shouldComponentUpdate(nextProps, nextState )
  {
    if(nextProps.gameMoveState.lastMoveState !== this.props.gameMoveState.lastMoveState)
      return true;
    else
      return false;
  }

  componentDidUpdate()
  {

    if(this.state.previousMoveTargetPositionId !== this.props.gameMoveState.lastMoveTargetPositionId
      && this.props.gameMoveState.lastMoveTargetPositionId !== null
      && this.props.gameMoveState.lastMoveState === LastMoveState.ValidMove)
    {
        this.moveAudioId.play();
        this.setState({previousMoveTargetPositionId: this.props.gameMoveState.lastMoveTargetPositionId});
        this.props.moveActionCompleted();
    }
    else if (this.props.gameMoveState.lastMoveState === LastMoveState.InValidMove)
    {
      //console.log("Invalid Move");
      this.inValidMoveSound();
      this.props.moveActionCompleted();
    }



  }

  render() {

    return (

      <audio ref= {(ref) =>  this.moveAudioId = ref}  src={require('../css/sounds/moveSound.wav')}/>

    );
  }

}




const mapStateToProps = state => {
  return {
    gameMoveState: state.gameMoveState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({moveActionCompleted: moveActionCompleted}, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(MovePlaySound)
