import React from 'react';
import {StoneColors} from '../helpers/constants.js'



class StartGameForm extends React.Component {
  constructor(props) {
    super(props);

    this.onColorSelection = this.onColorSelection.bind(this);
    this.onStonePickerDropDownClickToOpen = this.onStonePickerDropDownClickToOpen.bind(this);

    if(this.props.startGame.player1Color == null)
    {
      this.props.startGame.player1Color = StoneColors[0].color;
    }
    if(this.props.startGame.player2Color == null)
    {
      this.props.startGame.player2Color = StoneColors[1].color;
    }



    this.stonePickerContent = [null, null];
    this.stonePickerContentHidden =  [null, null]

  }

  componentDidUpdate(){
    if(this.props.startGame.firstTurn === 1)
    {
      this.chkPlayer1FirstTurn.checked = true;
      this.chkPlayer2FirstTurn.checked = false;
    }
    else
    {
      this.chkPlayer2FirstTurn.checked = true;
      this.chkPlayer1FirstTurn.checked = false;
    }


  }

  onStonePickerDropDownClickToOpen(event) {
    console.log('this is:');
    const playerId = event.currentTarget.getAttribute("playerid");
    this.stonePickerContent[playerId-1].style.height = "123px";
  }

  onColorSelection(event) {
    console.log('color selected');

    const playerId = event.currentTarget.getAttribute("playerid");
    const color = event.currentTarget.getAttribute("color");

    this.stonePickerContent[playerId-1].style.height = "0px";

    setTimeout(() => {
              console.log('color selected clear');
              //this.stonePickerContent[playerId-1].blur();
              this.stonePickerContent[playerId-1].style.removeProperty("height");
              //this.stonePickerContentHidden[playerId-1].value = color;

              const setValue = Object.getOwnPropertyDescriptor(this.stonePickerContentHidden[playerId-1].__proto__, 'value').set;
              const event = new Event('input', { bubbles: true });

              setValue.call(this.stonePickerContentHidden[playerId-1], color);
              this.stonePickerContentHidden[playerId-1].dispatchEvent(event);

    }, 200);



  }

  stonePickerItem(stoneColor){
    const radialGradient = 'radial-gradient(circle at 8px 8px, ' + stoneColor.color + ', #000)';
    return (
      <div style = {{'position': 'relative'}}>
        <span style = {{'paddingLeft': '10px', 'paddingTop': '3px'}}>
          <figure  style = {{ 'display': 'block',
                            'borderRadius': '100%',
                            'height': '24px',
                            'width': '24px',
                            'margin': 0,
                            'background':radialGradient}}>
          </figure>
        </span>
        <span   style = {{ 'paddingLeft': '15px',
                           'position'   : 'absolute',
                           'top'       : '0px'}}>{stoneColor.name}</span>
      </div>

    );
  }

  stonePickerDropdown(playerId,color){
      //console.log(playerId + ', ' + color);
      const colorLoader = StoneColors.map((stoneColor, index) => {
          //console.log(index + ', ' + stoneColor.name);
          if(this.props.startGame.player1Color !== stoneColor.color &&
                      this.props.startGame.player2Color !== stoneColor.color)
          {
            return (
              // eslint-disable-next-line
                <li onClick={this.onColorSelection} key = {index} playerid = {playerId} color = {stoneColor.color} >
                  {this.stonePickerItem(stoneColor)}
                </li>
              
            );
          }
          else {
            return null;
          }

        });

      return (

        <div onClick={this.onStonePickerDropDownClickToOpen} playerid = {playerId} className="stone-picker">
          <div className="wrapper">
              <div ref= {(ref) =>  this.stonePickerContent[playerId-1] = ref} className="content">
                  <ul>
                      {colorLoader}
                  </ul>
              </div>
              <div className="parent">
                {this.stonePickerItem({name: StoneColors.find(stone =>stone.color === color).name, color: color})}
                <input style={{'display': 'none'}} type="text" ref= {(ref) =>  this.stonePickerContentHidden[playerId-1] = ref} value = {color} id = {"player" + playerId + "Color"} onChange={this.props.handleStartGameChange}/>
              </div>
          </div>
        </div>
      )

  }

  render() {

    return (
              <React.Fragment>
                <div className="slider-modal-panel row">
                  <div className="slider-modal-panel-header"> Player 1 </div>
                  <div className="slider-modal-row row">
                    <div className="col-2">
                      <label htmlFor="player1Name">Name</label>
                    </div>
                    <div className="col-3">
                      <input type="text" id="player1Name" value = {this.props.startGame.player1Name} onChange={this.props.handleStartGameChange}
                            placeholder="Enter Name.."/>
                    </div>
                    <div className="col-2">
                      <label htmlFor="player1StoneColor">Stone Color</label>
                    </div>
                    <div className="col-3">
                        {this.stonePickerDropdown(1, this.props.startGame.player1Color)}
                    </div>
                  </div>
                  <div className="slider-modal-row row">
                    <div className="col-2">
                      <label htmlFor="isFirstTurn">First Turn</label>
                    </div>
                    <div className="col-3">
                      <input id="isFirstTurn" playerid = "1" type="checkbox" defaultChecked={this.props.startGame.firstTurn === 1? true: false}
                                ref= {(ref) =>  this.chkPlayer1FirstTurn = ref}   onChange={this.props.handleStartGameChange} />
                    </div>
                  </div>
                </div>
                <div  className="slider-modal-panel row">
                  <div className="slider-modal-panel-header"> Player 2 </div>
                  <div className="slider-modal-row row">
                    <div className="col-2">
                      <label htmlFor="player2Name">Name</label>
                    </div>
                    <div className="col-3">
                      <input type="text" id="player2Name" value = {this.props.startGame.player2Name} onChange={this.props.handleStartGameChange}
                            placeholder="Enter Name.."/>
                    </div>
                    <div className="col-2">
                      <label htmlFor="player2StoneColor">Stone Color</label>
                    </div>
                    <div className="col-3">
                        {this.stonePickerDropdown(2, this.props.startGame.player2Color)}
                    </div>
                  </div>
                  <div className="slider-modal-row row">
                    <div className="col-2">
                      <label htmlFor="isFirstTurn">First Turn</label>
                    </div>
                    <div className="col-3">
                      <input id="isFirstTurn" playerid = "2" type="checkbox" defaultChecked={this.props.startGame.firstTurn === 2? true: false}
                                      ref= {(ref) =>  this.chkPlayer2FirstTurn = ref}  onChange={this.props.handleStartGameChange} />
                    </div>
                  </div>
                </div>
              </React.Fragment>

          );
  }

}



export {StartGameForm};
