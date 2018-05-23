import React from 'react';

import GameBoard from './gameboard.js'
import SliderController from './slidercontroller.js'
import {SideSection} from './sidesection.js'
import PlayComputerTurn from './playComputerTurn.js'
import MovePlaySound from './moveSoundPlay.js'

class MainPanel extends React.Component {


  render() {

      return (
              <div className="col-12 row"  id="main">
                <SliderController/>
                <div className="row">
                  <GameBoard/>
                  <div className="col-3">
                    <SideSection/>
                  </div>
                </div>
                <PlayComputerTurn/>
                <MovePlaySound/>
              </div>
      );
  }


}

/*
 side-bar
<GameLoader/>
<PlayersBoxList/>
<ChangeTurn/>
*/

export default MainPanel;
