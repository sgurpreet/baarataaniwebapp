import React from 'react';

import GameBoard from './gameboard.js'
import DeclareWinner from './declarewinner.js'
import SliderController from './slidercontroller.js'
import {SideSection} from './sidesection.js'

class MainPanel extends React.Component {


  render() {

      return (
              <div className="col-12 row"  id="main">
                <SliderController/>
                <DeclareWinner/>
                <div className="row">
                  <GameBoard/>
                  <div className="col-3">
                    <SideSection/>
                  </div>
                </div>
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
