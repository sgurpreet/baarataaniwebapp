
const ItemTypes = {
  STONE: 'stone'
};

const StoneHolderStatus = {
  EMPTY: 0,
  PLAYER1: 1,
  PLAYER2: 2
}

const ActionTypes = {

    RESTARTGAME : 'restart game',
    STARTGAME :   'start game',
    STONEDRAGSTART: 'stone drag start',
    STONEDROPPED: 'stone dropped',
    GAMECOMPLETED: 'game finished',
    CHANGETURN: 'change turn',
    OPENSTARTGAME: 'open start game form',
    OPENSETTINGFORM: 'open settings form',
    OPENEDSLIDER: 'opened slider',
    CLOSESLIDER: 'close slider',
    SAVESETTINGS: 'save settings',
    SAVEDRAWMETADATA: 'Save draw meta data'
}

const GameStatus = {

  INPROGRESS: 'in progress',
  INPROGRESSCHANGETURN: 'in progress waiting for change of turn',
  NORESULT: 'left in beween',
  COMPLETED: 'completed'

};

const AllowedMovesSequence = [[1,2,3,4,5],
                              [6,7,8,9,10],
                              [11,12,13,14,15],
                              [16,17,18,19,20],
                              [21,22,23,24,25],
                              [1,6,11,16,21],
                              [2,7,12,17,22],
                              [3,8,13,18,23],
                              [4,9,14,19,24],
                              [5,10,15,20,25],
                              [1,7,13,19,25],
                              [5,9,13,17,21]];


const SliderChild = {

  STARTGAME: 'start game',
  SETTINGS: 'settings'

}


const StoneColors =[{color:"#dc143c", name: "Crimson"},
                    {color:"#8B0000", name: "Dark Red"},
                    {color:"#FF8C00", name: "Drak Orange"},
                    {color:"#FFD700", name: "Gold"},
                    {color:"#FF00FF", name: "Magenta"},
                    {color:"#800080", name: "Purple"},
                    {color:"#4B0082", name: "Indigo"},
                    {color:"#2E8B57", name: "Sea Green"},
                    {color:"#4682B4", name: "Steel Blue"},
                    {color:"#000080", name: "Navy"},
                    {color:"#4169E1", name: "Blue"},
                    {color:"#008080", name: "Teal"}]




export {ItemTypes, StoneHolderStatus, ActionTypes, AllowedMovesSequence, GameStatus, SliderChild, StoneColors}
