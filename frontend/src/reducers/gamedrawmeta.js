import {ActionTypes} from '../helpers/constants.js'


class DrawMetaData {
  constructor(isMetaDataAvailable, availableHeight, availableWidth, verticalGap,
                horizontalGap, margin, lineWidth){
    this.isMetaDataAvailable = isMetaDataAvailable
    this.availableHeight = availableHeight
    this.availableWidth = availableWidth
    this.verticalGap = verticalGap
    this.horizontalGap = horizontalGap
    this.margin = margin
    this.lineWidth = lineWidth
  }

}

const GameDrawMeta = (state = null, action) => {

  switch (action.type) {

    case ActionTypes.SAVEDRAWMETADATA:

      return new DrawMetaData(action.payload.isMetaDataAvailable,
                              action.payload.availableHeight,
                              action.payload.availableWidth,
                              action.payload.verticalGap,
                              action.payload.horizontalGap,
                              action.payload.margin,
                              action.payload.lineWidth);

    default:
      return state;

  }

} ;


export {GameDrawMeta};
