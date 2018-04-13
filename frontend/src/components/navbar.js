import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {restartGame, openStartGameSlider, openSettingSlider, openHelpSlider} from '../actions/index.js'

class NavBar extends React.Component {

  render() {

      // eslint-disable-next-line
      const stoneHolders = this.props.stonderHolders;

      return (

        <div className="col-12 menu row">

          <ul>
            <li><a onClick={() => this.props.openStartGameSlider()} >Start Game</a></li>
            <li><a onClick={() => this.props.restartGame()} >Restart</a></li>
            <li style = {{"float": "right"}}><a onClick={() => this.props.openHelpSlider()} >Help</a></li>
          </ul>

        </div>



      );
  }


}

const mapStateToProps = state => {
  return {
    stoneHolders: state.stonderHolders
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ restartGame: restartGame,
                              openStartGameSlider: openStartGameSlider,
                              openSettingSlider: openSettingSlider,
                              openHelpSlider: openHelpSlider
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
