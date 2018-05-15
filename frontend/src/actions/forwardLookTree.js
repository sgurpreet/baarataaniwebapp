import {StoneHolderStatus, AllowedMovesSequence,ReverseAllowedMovesSequence} from '../helpers/constants.js'

//import {generateGuid} from '../helpers/utils.js'


class Node {

  constructor(nodeId,parent, depth, reward, playerId,moves){
    this.nodeId = nodeId;
    this.parent = parent;
    this.childNodes = [];
    this.depth = depth;
    this.reward = reward;
    this.playerId = playerId;
    this.moves = moves;

  }

  static createNode(depth, reward, playerId, moves, parent)
  {
    return new Node (Node.getNextNodeId(), parent, depth, reward, playerId, moves);
  }

  // This function will generate tree to be used in the Alpha beta MinMax
  static generateTree(depth, playerId, stoneHolders, reward, tree)
  {

    if( depth === 0)
    {
      return tree;
    }

    const nextNodePlayerId = playerId === StoneHolderStatus.PLAYER1? StoneHolderStatus.PLAYER2:
                                  StoneHolderStatus.PLAYER1;

    // Get all positions for current player
    const playerStones = stoneHolders.filter(stone => stone.status === playerId)

    // Find allowed Moves for each position for player
    for( let stoneIndex = 0; stoneIndex < playerStones.length; stoneIndex++)
    {
      const stonePositionId = playerStones[stoneIndex].positionId

      for (let routeIndex = 0; routeIndex < AllowedMovesSequence.length; routeIndex++)
      {
        // position for stone in route
        let stoneRouteIndex = AllowedMovesSequence[routeIndex].indexOf(stonePositionId)

        if(stoneRouteIndex === -1)
          continue;

        tree = Node.FindMovesAndAddToTree(depth, tree,
                                  playerId, nextNodePlayerId,
                                  AllowedMovesSequence[routeIndex], stoneRouteIndex,
                                  stoneHolders, stonePositionId, reward)

        // position for stone in route backward
        stoneRouteIndex = ReverseAllowedMovesSequence[routeIndex].indexOf(stonePositionId)

        tree = Node.FindMovesAndAddToTree(depth, tree,
                                  playerId, nextNodePlayerId,
                                  ReverseAllowedMovesSequence[routeIndex], stoneRouteIndex,
                                  stoneHolders, stonePositionId, reward)

      }

    }

  }

  static instanceCounter = 0;

  static getNextNodeId()
  {
    Node.instanceCounter++;
    return Node.instanceCounter;
  }

  static FindMovesAndAddToTree(depth, tree,
                            playerId, nextNodePlayerId,
                            moveSequence, stoneRouteIndex,
                            stoneHolders, stonePositionId, reward)
  {
    // Forward one step
    const {oneStepStoneHolderStateAfterMove, oneStepMoves, oneStepReward }=
              Node.oneStep(moveSequence, stoneRouteIndex,
                        stoneHolders, playerId, [])

    if(oneStepStoneHolderStateAfterMove != null)
    {
        reward = reward + oneStepReward;
        let node = Node.createNode(depth, reward, playerId, oneStepMoves, tree)
        tree.childNodes.push(node)
        //generate child nodes
        //(depth, playerId, stoneHolders, reward, tree)
        Node.generateTree(depth-1,nextNodePlayerId, oneStepStoneHolderStateAfterMove,reward, node)
    }
    else // check for 2 steps
    {
      const {twoStepStoneHolderStateAfterMove, twoStepMoves, twoStepReward } =
                Node.TwoStep(moveSequence, stoneRouteIndex, stoneHolders,
                        playerId, nextNodePlayerId, 0, [])

        if(twoStepStoneHolderStateAfterMove != null)
        {
            reward = reward + twoStepReward;
            let node = Node.createNode(depth, reward, playerId, twoStepMoves, tree)
            tree.childNodes.push(node)
            //generate child nodes
            //(depth, playerId, stoneHolders, reward, tree)
            Node.generateTree(depth-1,nextNodePlayerId, twoStepStoneHolderStateAfterMove,reward, node)
        }
    }

    return tree;
  }

  static oneStep(moveSequence, stoneRouteIndex, stoneHolders,
                      playerId, moves)
  {

    let stoneHolderStateAfterMove = null;

    if(moveSequence.length > stoneRouteIndex + 1 // target position present and empty
        && stoneHolders[moveSequence[stoneRouteIndex + 1]-1].status === StoneHolderStatus.EMPTY)
      {
        stoneHolderStateAfterMove = stoneHolders.slice(0, stoneHolders.length)

        stoneHolderStateAfterMove[moveSequence[stoneRouteIndex]-1] =
                  {positionId: moveSequence[stoneRouteIndex],
                    status: StoneHolderStatus.EMPTY}

        stoneHolderStateAfterMove[moveSequence[stoneRouteIndex+1]-1] =
                      {positionId: moveSequence[stoneRouteIndex+1],
                          status: playerId}

        // saves moves
        moves.push({sourcePositionId: moveSequence[stoneRouteIndex],
                          targetPositionId: moveSequence[stoneRouteIndex+1]})

      }

      return {oneStepStoneHolderStateAfterMove: stoneHolderStateAfterMove,
              oneStepMoves: moves,
              oneStepReward: 0 }// no reward for single step};
  }


  static TwoStep(moveSequence, stoneRouteIndex, stoneHolders,
                    playerId, nextNodePlayerId, reward, moves)
  {

    let stoneHolderStateAfterMove = null;

    if(moveSequence.length > stoneRouteIndex + 2 // target position present and empty
        && stoneHolders[moveSequence[stoneRouteIndex + 2]-1].status === StoneHolderStatus.EMPTY
        && stoneHolders[moveSequence[stoneRouteIndex + 1]-1].status === nextNodePlayerId)
      {
        //create new state
        stoneHolderStateAfterMove = stoneHolders.slice(0, stoneHolders.length)

        stoneHolderStateAfterMove[moveSequence[stoneRouteIndex]-1] = {positionId: moveSequence[stoneRouteIndex],
                                                                        status: StoneHolderStatus.EMPTY}

        stoneHolderStateAfterMove[moveSequence[stoneRouteIndex+1]-1] = {positionId: moveSequence[stoneRouteIndex+1],
                                                                        status: StoneHolderStatus.EMPTY}

        stoneHolderStateAfterMove[moveSequence[stoneRouteIndex+2]-1] = {positionId: moveSequence[stoneRouteIndex+2],
                                                                        status: playerId}

        //add reward

        reward = playerId === StoneHolderStatus.PLAYER2? reward + 1 : reward - 1;
        // saves moves
        moves.push({sourcePositionId: moveSequence[stoneRouteIndex],
                          targetPositionId: moveSequence[stoneRouteIndex+2]})

        // find subsequent moves from same position...
        let stonePositionId = moveSequence[stoneRouteIndex+2]
        for (let routeIndex = 0; routeIndex < AllowedMovesSequence.length; routeIndex++)
        {
          // position for stone in route
          stoneRouteIndex = AllowedMovesSequence[routeIndex].indexOf(stonePositionId)

          if(stoneRouteIndex === -1)
            continue;

          //Forward Step
          const {twoStepStoneHolderStateAfterMove, twoStepMoves, twoStepReward } =
                    Node.TwoStep(AllowedMovesSequence[routeIndex], stoneRouteIndex, stoneHolderStateAfterMove,
                              playerId, nextNodePlayerId, reward, moves)

          if(twoStepReward === reward)
          {
            // position for stone in route backward
            stoneRouteIndex = ReverseAllowedMovesSequence[routeIndex].indexOf(stonePositionId)

            //Backward Step
            const {twoStepStoneHolderStateAfterMove, twoStepMoves, twoStepReward } =
                      Node.TwoStep(ReverseAllowedMovesSequence[routeIndex], stoneRouteIndex, stoneHolderStateAfterMove,
                                playerId, nextNodePlayerId, reward, moves)

            if(twoStepReward > reward)
            {
              stoneHolderStateAfterMove = twoStepStoneHolderStateAfterMove
              moves = twoStepMoves
              reward = twoStepReward
            }

          }
          else {
              stoneHolderStateAfterMove = twoStepStoneHolderStateAfterMove
              moves = twoStepMoves
              reward = twoStepReward
          }
      }

    }

    return {twoStepStoneHolderStateAfterMove: stoneHolderStateAfterMove,
            twoStepMoves: moves,
            twoStepReward: reward};

  }
}

export {Node}
