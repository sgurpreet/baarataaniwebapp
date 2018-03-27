import React from 'react';


class GameSkelton extends React.Component {

  createSkelton() {

    //console.log(this.props.drawMetaData.isMetaDataAvailable);

    if(this.props.drawMetaData.isMetaDataAvailable === true)
    {
      const lineWidth       = this.props.drawMetaData.lineWidth;
      const margin          = this.props.drawMetaData.margin;
      const horizontalGap   = this.props.drawMetaData.horizontalGap;
      const verticalGap     = this.props.drawMetaData.verticalGap;
      const availableHeight = this.props.drawMetaData.availableHeight;
      const availableWidth  = this.props.drawMetaData.availableWidth;

      const arr = Array.from({length:5},() => '');

      const columns = arr.map(function(element, index){
            return <line key={index}  x1={Math.ceil(3*lineWidth/2) + horizontalGap*index}
                                      y1= {Math.ceil(3*lineWidth/2)}
                                      x2={Math.ceil(3*lineWidth/2) + horizontalGap*index}
                                      y2={availableHeight -2*margin - lineWidth*4}
                                      style={{'stroke':'var(--default-color)','strokeWidth':lineWidth}} />
      });

      const rows = arr.map(function(element, index){
            return <line key={index}  x1={Math.ceil(3*lineWidth/2)}
                                      y1= {Math.ceil(3*lineWidth/2) + verticalGap*index}
                                      x2={availableWidth -2*margin - lineWidth*4}
                                      y2={Math.ceil(3*lineWidth/2) + verticalGap*index}
                                      style={{'stroke':'var(--default-color)','strokeWidth':lineWidth}} />
      });

      const iteratorOnBoard = Array.from({length:25},() => '');
      const circles = iteratorOnBoard.map(function(element, index){
            const col = index % 5;
            const row = Math.trunc(index/5);
            //console.log(row + ', ' + col);

            const cx = Math.ceil(3*lineWidth/2) + col*horizontalGap;
            const cy = Math.ceil(3*lineWidth/2) + row*verticalGap;

            return <circle key={index} cx={cx} cy={cy} r={1.5*lineWidth} strokeWidth="0"
                style={{'fill':'var(--default-color)','strokeWidth':lineWidth}}/>

      });


      const diagnol = () => {

            return (

              <React.Fragment>
                <line x1={Math.ceil(3*lineWidth/2)}
                      y1= {Math.ceil(3*lineWidth/2)}
                      x2={availableWidth - 2*margin - lineWidth*4 }
                      y2={availableHeight - 2*margin - lineWidth*4}
                                  style={{'stroke':'var(--default-color)','strokeWidth':lineWidth}} />

                <line x1={availableWidth - 2*margin - lineWidth*5 + Math.ceil(3*lineWidth/2)}
                      y1={Math.ceil(3*lineWidth/2)}
                      x2={Math.ceil(3*lineWidth/2)}
                      y2={availableHeight - 2*margin - lineWidth*5 + Math.ceil(3*lineWidth/2)}
                                  style={{'stroke':'var(--default-color)','strokeWidth':lineWidth}}/>
              </React.Fragment>

            )
      }

      return (

        <svg style={{'marginTop':(margin+ 10) + 'px', marginLeft: margin + 'px'}}
                    height={availableHeight-margin -10} width= {availableWidth-margin}>
          {columns}
          {rows}
          {diagnol()}
          {circles}
        </svg>

      );

    }
    else {
      return null;
    }


  }

  render() {

      return this.createSkelton();

  }

}

export default GameSkelton;
