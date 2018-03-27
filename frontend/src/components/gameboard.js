
import React from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import GameSkelton from './gameskelton.js'
import GameLoader from './gameloader.js'

import {saveGameDrawMetaData} from '../actions/index.js'

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    //var refs = ReactDOM.findDOMNode(this.refs.gameSectionStart);

    this.state = {isMetaDataAvailable: false};

  }

  componentDidMount() {

      if(this.state.isMetaDataAvailable ===false)
      {

        const screenHeight = window.screen.availHeight;
        const screenWidth = window.screen.availWidth;
        //console.log(screenHeight + ',' + screenWidth);

        //const positionFromTop = this.gameSectionRef.offsetTop;

        //console.log(this.gameSectionRef.offsetTop + ',' +
        //                      this.gameSectionRef.offsetWidth);

        let margin = Math.trunc(2/100*this.gameSectionRef.offsetWidth);
        margin = margin%2===0? margin : margin - 1;

        let lineWidth = Math.trunc(1/100*this.gameSectionRef.offsetWidth);
        lineWidth = lineWidth%2 === 0? lineWidth : lineWidth - 1;



        //console.log(margin + ', ' + lineWidth);

        let availableHeight = screenHeight - this.gameSectionRef.offsetTop - 50;

        if(screenWidth <= 600)
        {
            availableHeight = availableHeight - 100;
        }

        let availableWidth = this.gameSectionRef.offsetWidth;
        //console.log(availableHeight + ',' + availableWidth);

        const horizontalGap = Math.trunc((availableWidth - lineWidth*5 - 2*margin)/4);
        const verticalGap = Math.trunc((availableHeight - lineWidth*5 - 2*margin)/4);

        //console.log(verticalGap + ',' + horizontalGap);

        const drawMetaData = { isMetaDataAvailable: true,
                        availableHeight: availableHeight,
                        availableWidth: availableWidth,
                        verticalGap: verticalGap,
                        horizontalGap: horizontalGap,
                        margin: margin,
                        lineWidth: lineWidth}

        this.setState(drawMetaData);

        // save meta data
        this.props.saveGameDrawMetaData(drawMetaData);
      }
  }

  render() {

    return (

        <div id="gamesection" ref= {(ref) =>  this.gameSectionRef = ref} className="col-9 game-skelton-board">
          {this.state.isMetaDataAvailable && <GameSkelton drawMetaData = {this.state} />}
          {this.state.isMetaDataAvailable && <GameLoader drawMetaData = {this.state}/>}
        </div>

      );

  }

}

const mapStateToProps = (state,ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveGameDrawMetaData: saveGameDrawMetaData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps
)(GameBoard)
