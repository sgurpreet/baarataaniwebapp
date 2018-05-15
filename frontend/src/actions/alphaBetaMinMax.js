import {Node} from '../actions/forwardLookTree.js'

const findMaxNode = (nodeA, nodeB) =>
{
  if(nodeA.reward > nodeB.reward)
    return nodeA;
  else {
    return nodeB;
  }

}

const findMinNode = (nodeA, nodeB) =>
{
  if(nodeA.reward < nodeB.reward)
    return nodeA;
  else {
    return nodeB;
  }

}

const getNextMove = (depth, tree) =>
{
  let nextMove = alphaBeta(tree, Node.createNode(-1, -25, -1, null),
                  Node.createNode(-1, 25, -1, null), true);
  console.log(nextMove);

  return findRootMove(depth, nextMove);
}

const findRootMove = (depth, nextMove) =>
{
  if(nextMove.depth === depth)
  {
    return nextMove;
  }
  else
  {
    return findRootMove(depth, nextMove.parent);
  }
}

const alphaBeta = (node, alpha, beta, maximizingPlayer) =>
{
  if(node.childNodes.length === 0)
  {
    return node;
  }

  if(maximizingPlayer === true)
  {
    let v = Node.createNode(6,-25, -1, null)
    for(let index = 0; index < node.childNodes.length; index++  )
    {
        v = findMaxNode(v, alphaBeta(node.childNodes[index], alpha, beta, false))
        alpha = findMaxNode(alpha, v)
        //if(beta.reward <= alpha.reward)
        //  break;
    }
    return v;
  }
  else {
    let v = Node.createNode(6, 25, -1, null)
    for(let index = 0; index < node.childNodes.length; index++  )
    {
        v = findMinNode(v, alphaBeta(node.childNodes[index], alpha, beta, true))
        beta = findMinNode(beta, v)
        //if(beta.reward <= alpha.reward)
        //  break;
    }
    return v;
  }

}

export {getNextMove}
