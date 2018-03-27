import React from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import {SliderChild} from '../helpers/constants.js'
import {StartGameForm} from './startgameform.js'
import {closeSlider, openedSlider, startGame} from '../actions/index.js'


class SliderController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
                startGame : {
                              player1Name: '',
                              player1Color: null,
                              player2Name:'',
                              player2Color: null,
                              firstTurn: 1
                            }
    }



    this.handleStartGameChange = this.handleStartGameChange.bind(this);

  }

  handleStartGameChange(event) {

      if(event.target.id === "player1Name")
      {
        this.setState({startGame :
                        {
                          player1Name: event.target.value,
                          player2Name: this.state.startGame.player2Name,
                          player1Color: this.state.startGame.player1Color,
                          player2Color: this.state.startGame.player2Color,
                          firstTurn: this.state.startGame.firstTurn
                        }
                      }
                    )
      }
      else if(event.target.id === "player2Name") {
        this.setState({startGame :
                        {
                          player1Name: this.state.startGame.player1Name,
                          player2Name: event.target.value,
                          player1Color: this.state.startGame.player1Color,
                          player2Color: this.state.startGame.player2Color,
                          firstTurn: this.state.startGame.firstTurn
                        }
                      }
                    )

      }
      else if(event.target.id === "player1Color") {
        this.setState({startGame :
                        {
                          player1Name: this.state.startGame.player1Name,
                          player2Name: this.state.startGame.player2Name,
                          player1Color: event.target.value,
                          player2Color: this.state.startGame.player2Color,
                          firstTurn: this.state.startGame.firstTurn

                        }
                      }
                    )

      }
      else if(event.target.id === "player2Color") {
        this.setState({startGame :
                        {
                          player1Name: this.state.startGame.player1Name,
                          player2Name: this.state.startGame.player2Name,
                          player1Color: this.state.startGame.player1Color,
                          player2Color: event.target.value,
                          firstTurn: this.state.startGame.firstTurn
                        }
                      }
                    )

      }
      else if(event.target.id === "isFirstTurn") {
        let playerId = event.currentTarget.getAttribute("playerid");
        const isChecked = event.currentTarget.checked;

        this.setState({startGame :
                        {
                          player1Name: this.state.startGame.player1Name,
                          player2Name: this.state.startGame.player2Name,
                          player1Color: this.state.startGame.player1Color,
                          player2Color: this.state.startGame.player2Color,
                          firstTurn: playerId === 1? (isChecked === true? 1: 2): (isChecked === true? 2: 1)
                        }
                      }
                    );
        //console.log("First Turn: Player " + this.state.startGame.firstTurn);

      }

  }
  componentDidUpdate()
  {
    //console.log("After update First Turn: Player " + this.state.startGame.firstTurn);
  }

  renderSlider()
  {
    let styleMaxHeight = "0px";

    if(this.props.sliderController.openSlider === true)
    {
      styleMaxHeight = "1000px";
    }

    return (
          <div className="row col-12 slider-modal" style = {{'maxHeight': styleMaxHeight}}>
            { this.props.sliderController.openSlider === true
              && this.props.sliderController.sliderChild === SliderChild.STARTGAME
              && (      <form style={{'marginTop': '25px'}}>
                          <StartGameForm handleStartGameChange = {this.handleStartGameChange}
                                        startGame = {this.state.startGame}  />
                          <div className="col-12 row slider-modal-row" style={{"marginBottom": "25px"}}>
                            <input type="button" onClick={() => this.props.startGame(this.state.startGame)} value="Start Game"/>
                            <input type="button" onClick={() => this.props.closeSlider()} value="Cancel"/>
                          </div>
                        </form>
                )
            }

          </div>
        )
  }

  render() {

    return this.renderSlider();

  }

}


const mapStateToProps = (state,ownProps) => {
  return {
    sliderController: state.sliderController,
    currentGame: state.currentGame,
    players: state.players
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({closeSlider: closeSlider,
                            openedSlider: openedSlider,
                            startGame: startGame}, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SliderController)
