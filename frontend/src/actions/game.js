import {StoneHolderStatus, AllowedMovesSequence,GameStatus} from '../helpers/constants.js'


const findAllowedRouteBasedonCurrentState = (sourcePositionId,targetPositionId) =>{
  return AllowedMovesSequence.filter( sequence =>
                      sequence.includes(sourcePositionId) && sequence.includes(targetPositionId));
}

const checkMoveValidStepAndCenterPosition = (moveRoute,stoneHolders,sourcePositionId,
                                      targetPositionId, sourceStatus, gameStatus, lastGameMove) => {


  const sourceIndex = moveRoute.indexOf(sourcePositionId);
  const targetIndex = moveRoute.indexOf(targetPositionId);

  const movedStepsCount = Math.abs(targetIndex - sourceIndex);

  if(movedStepsCount === 1
    && gameStatus === GameStatus.INPROGRESS
    && lastGameMove.turnScoreCount === 0) //Allowed only if current turn first move
  {
    return { valid: true, centerPositionId: null } ;
  }
  else if (movedStepsCount > 2) // Not Allowed more then 2 steps
  {
    return { valid: false, centerPositionId: null } ;
  }
  else if(movedStepsCount === 2)
  {
    const betweenStoneHolder = targetIndex > sourceIndex? stoneHolders[moveRoute[sourceIndex + 1]-1]
                                        : stoneHolders[moveRoute[targetIndex + 1]-1]; // center position

    if(betweenStoneHolder.status === sourceStatus
        || betweenStoneHolder.status === StoneHolderStatus.EMPTY)
      return { valid: false, centerPositionId: null } ;
    else if ( lastGameMove.turnScoreCount === 0 ||
              (lastGameMove.turnScoreCount > 0 &&
                sourcePositionId === lastGameMove.lastMoveTargetPositionId)){
      return { valid: true, centerPositionId: betweenStoneHolder.positionId } ;
    }
    else
    {
      return { valid: false, centerPositionId: null } ;
    }

  }
  else {
    return { valid: false, centerPositionId: null } ;
  }

}


const canMakeMove = (player, stoneHolders, sourcePositionId, sourceStatus,
      targetPositionId, gameStatus, lastGameMove) => {

  //console.log(player)
  //console.log(lastGameMove)

  if(player.playerId !== sourceStatus || player.turn === false)
    return false;



  //If occupied return false;
  if(stoneHolders[targetPositionId-1].status !== StoneHolderStatus.EMPTY)
    return false;

  // find allowed AllowedMovesSequence
  const filterSequences = findAllowedRouteBasedonCurrentState(sourcePositionId, targetPositionId);

  //check if sequence is present
  if(filterSequences.length === 1)
  {
    const moveRoute = filterSequences[0];

    // eslint-disable-next-line
    const {valid, centerPositionId} = checkMoveValidStepAndCenterPosition(moveRoute,stoneHolders, sourcePositionId,
                                                    targetPositionId, sourceStatus, gameStatus, lastGameMove)

    return valid;

  }

  return false;


}

const moveScorePosition = (stoneHolders, sourcePositionId, sourceStatus,
                          targetPositionId, gameStatus, lastGameMove) => {

  //If occupied return false;
  if(stoneHolders[targetPositionId-1].status !== StoneHolderStatus.EMPTY)
    return null;

  // find allowed AllowedMovesSequence
  const filterSequences = findAllowedRouteBasedonCurrentState(sourcePositionId, targetPositionId);

  //check if sequence is present
  if(filterSequences.length === 1)
  {
    const moveRoute = filterSequences[0];

    // eslint-disable-next-line
    const {valid, centerPositionId} = checkMoveValidStepAndCenterPosition(moveRoute,stoneHolders,sourcePositionId,
                                                    targetPositionId, sourceStatus, gameStatus, lastGameMove)

    return centerPositionId;

  }

  return null;

}


const isGameCompleted = (stoneHolders, vacantPositionId) => {


  if(stoneHolders.filter( _ => _.status === StoneHolderStatus.PLAYER2).length === 1
      && StoneHolderStatus.PLAYER2 === stoneHolders[vacantPositionId - 1].status)
  {
    //console.log(StoneHolderStatus.PLAYER1)
    return {gameStatus: GameStatus.COMPLETED, winnerPlayerId: StoneHolderStatus.PLAYER1};
  }
  else if(stoneHolders.filter( _ => _.status === StoneHolderStatus.PLAYER1).length === 1
      && StoneHolderStatus.PLAYER1 === stoneHolders[vacantPositionId - 1].status)
  {
    return {gameStatus: GameStatus.COMPLETED, winnerPlayerId: StoneHolderStatus.PLAYER2};
  }
  else {
      return {gameStatus: GameStatus.INPROGRESS, winnerPlayerId: -1};
  }

}


export {canMakeMove, moveScorePosition,isGameCompleted}
