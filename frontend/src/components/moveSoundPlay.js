import React from 'react';
import { connect } from 'react-redux'


class MovePlaySound extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        previousMoveTargetPositionId: -1
      };

  }

  componentDidUpdate()
  {

    if(this.state.previousMoveTargetPositionId !== this.props.gameMoveState.lastMoveTargetPositionId
      && this.props.gameMoveState.lastMoveTargetPositionId !== null)
    {
        this.moveAudioId.play();
        this.setState({previousMoveTargetPositionId: this.props.gameMoveState.lastMoveTargetPositionId});
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


export default connect(
  mapStateToProps
)(MovePlaySound)
