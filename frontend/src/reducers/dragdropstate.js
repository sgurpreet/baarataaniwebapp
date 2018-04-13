import {ActionTypes} from '../helpers/constants.js'

const initState =
{
  isDragging: false
}

const DragDropState = (state = initState, action) => {

  switch (action.type) {

    case ActionTypes.ISDRAGGING:
      console.log('Dragging set');
      return {isDragging: true}

    case ActionTypes.STONEDROPPED:

      return state;

    case ActionTypes.CHANGETURN:
      return initState;

    default:
      return state;

  }



}

export { DragDropState };
