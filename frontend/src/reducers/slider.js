import {ActionTypes, SliderChild} from '../helpers/constants.js'


class Slider {
  constructor(openSlider, isSliderOpen,sliderChild){
    this.openSlider = openSlider;
    this.isSliderOpen = isSliderOpen;
    this.sliderChild = sliderChild;
  }
}

const initSlider = () =>
{
  return new Slider (false, false, null);
}

const SliderController = (state = initSlider(), action) => {

  switch (action.type) {

    case ActionTypes.OPENSTARTGAME:

      if(state.isSliderOpen === true)
      {
        return state;
      }
      else {
        return new Slider(true,false,SliderChild.STARTGAME);
      }

    case ActionTypes.OPENRESTARTGAME:

        if(state.isSliderOpen === true)
        {
          return state;
        }
        else {
          return new Slider(true,false,SliderChild.RESTARTGAME);
        }

    case ActionTypes.OPENHELPFORM:

      if(state.isSliderOpen === true)
      {
        return state;
      }
      else {
        return new Slider(true,false,SliderChild.HELP);
      }

    case ActionTypes.GAMECOMPLETED:

      return new Slider(true,false,SliderChild.DECLAREWINNER);

    case ActionTypes.OPENEDSLIDER:

        if(state.isSliderOpen === true)
        {
          return state;
        }
        else {
          return new Slider(false,true,state.sliderChild);
        }

    case ActionTypes.CLOSESLIDER:
    case ActionTypes.STARTGAME:

        return new Slider(false,false,state.sliderChild);


    case ActionTypes.RESTARTGAME:
    case ActionTypes.OPENSETTINGFORM:
      return initSlider()
    default:
      return state;

  }

} ;


export {Slider, SliderController};
