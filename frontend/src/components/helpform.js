import React from 'react';



class HelpForm extends React.Component {




  render() {

    return (
              <React.Fragment>
                <h1>How to Play Baara Taani:</h1>
                <p>Learning the rules of baara taani is easy:</p>
                <h2>Step 1. How to Setup the Baara Taani board</h2>
                <p>At the beginning of the game the board is laid out so that each player has the 12 stone of one color. The baara taani board has 25 stone holder positions and all the assigned stones are laid out on the board opposite to each other with center position empty.</p>
                <h2>Step 2. How the Baara Taani Stones Move</h2>
                <p>The Baara Taani board lines linked stone holders in a vertical, horizontal and diagonal directions. Stone can move along the line to any directions. The first move/turn can be assigned to any player. </p>
                <h3>1 step move</h3>
                <p>Stone can be moved to adjacent stone holder position only if the stone holder position is empty and line is drawn between these positions. After stone change the position, the next move/turn will be assigned to opponent player.</p>
                <h3>2 step move</h3>
                <p>Stone can be moved to 2 positions only if following conditions met:-</p>
                <ul>
                  <li>Centre between source (current position of stone) and target ( new position of stone) is occupied.</li>
                  <li>Centre position must be occupied by opponent color stone.</li>
                  <li>Line must exists between source and target</li>
                </ul>
                <p>After the stone met above condition and stone has been moved to new stone holder position. Opponent stone is removed from centre position. The player who make the move got 1 score incremented and opponent stone count will be reduced by one.</p>
                <h3>2 step move - (subsequent moves in 2 step turn)</h3>
                <p>The same player have the option to continue to make any number of 2 step moves if all the conditions are met which are provided in the “2 step moves”, plus, the source stone must be same in the subsequent moves i.e. player can make any number of 2 step turn with the same stone provided all the rules are met.</p>
                <h3>2 step move - (change turn)</h3>
                <p>2 step move won’t change the turn automatically for 9 seconds. The player can change the turn based on his judgement by clicking “Change Turn” button. Otherwise, the turn will be assigned to the opponent after 9 seconds.</p>
                <h1>Step 3. How to Win a Game of Baara Taani</h1>
                <p>1 point is incremented to the player score with each “2 step move” and that remove 1 stone for the opponent. The player who score 12 points is declared winner.</p>
              </React.Fragment>

          );
  }

}



export {HelpForm};
