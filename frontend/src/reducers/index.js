import { combineReducers } from 'redux';

import {Players} from "./players";
import {StoneHolders} from "./stoneholder";
import {CurrentGame} from "./game.js";
import {SliderController} from './slider.js'
import {GameDrawMeta} from './gamedrawmeta.js'

const rootReducer = combineReducers({
  players: Players,
  stoneHolders: StoneHolders,
  currentGame: CurrentGame,
  sliderController: SliderController,
  gameDrawMeta: GameDrawMeta
});

export default rootReducer;
