import { combineReducers } from 'redux';

import {Players} from "./players";
import {StoneHolders} from "./stoneholder";
import {CurrentGame} from "./game.js";
import {SliderController} from './slider.js'
import {GameDrawMeta} from './gamedrawmeta.js'
import {GameMoves} from './gamemoves.js'
import {GameMoveState} from './gamemovestate.js'
import {DragDropState} from './dragdropstate.js'

const rootReducer = combineReducers({
  players: Players,
  stoneHolders: StoneHolders,
  currentGame: CurrentGame,
  sliderController: SliderController,
  gameDrawMeta: GameDrawMeta,
  gameMoves: GameMoves,
  gameMoveState: GameMoveState,
  dragDropState: DragDropState
});

export default rootReducer;
