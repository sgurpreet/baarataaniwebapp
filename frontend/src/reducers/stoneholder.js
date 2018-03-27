import {ActionTypes,StoneHolderStatus} from '../helpers/constants.js'

class StoneHolder {
  constructor(positionId, status = 0){
    this.positionId = positionId;
    this.status = status // 0 = Empty, 1 = Player 1, 2 = Player 2
  }

}

const generateStoneHolders = () =>
{
  let holders = [];
  //console.log("First attempt")
  for ( let index = 1; index <= 25; index++  )
    holders.push(new StoneHolder (index));

  return holders;
}

const StoneHolders = (state = generateStoneHolders(), action) => {

  switch (action.type) {

    case ActionTypes.RESTARTGAME:
    case ActionTypes.STARTGAME:

      return state.map(stoneHolder => {
        if(stoneHolder.positionId === 13)
          return new StoneHolder (stoneHolder.positionId, StoneHolderStatus.EMPTY) ;
        else if(stoneHolder.positionId < 13)
          return new StoneHolder (stoneHolder.positionId, StoneHolderStatus.PLAYER1)
        else return new StoneHolder (stoneHolder.positionId, StoneHolderStatus.PLAYER2)

      })

    case ActionTypes.STONEDROPPED:

      return state.map(stoneHolder => {
        if(stoneHolder.positionId === action.payload.sourcePositionId)
          return new StoneHolder (stoneHolder.positionId, StoneHolderStatus.EMPTY)
        else if(stoneHolder.positionId === action.payload.targetPositionId)
          return new StoneHolder (stoneHolder.positionId, action.payload.sourceStatus)
        else if(stoneHolder.positionId === action.payload.vacantPositionId)
          {
            //console.log("Vacanted.")
            return new StoneHolder (stoneHolder.positionId, StoneHolderStatus.EMPTY)
          }
        else return stoneHolder

      })

    default:
      return state;

  }



}

export { StoneHolder, StoneHolders };
