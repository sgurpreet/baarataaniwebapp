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



    default:
      return state;

  }

} ;


export {Slider, SliderController};
