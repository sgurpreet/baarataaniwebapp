class Stone  {
  constructor(stoneId, stoneColor) {
    this.stoneId = stoneId;
    this.stoneColor = stoneColor;
  }

}

class PlayerStone extends Stone  {
  constructor(playerId, stoneId, stoneColor) {
    super(stoneId,stoneColor);
    this.playerId = playerId;

  }

}

export default PlayerStone;
