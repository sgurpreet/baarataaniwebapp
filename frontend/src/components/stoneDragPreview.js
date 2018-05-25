import React, { Component } from 'react'

export default class StoneDragPreview extends Component {


  render() {

    const { player, lineWidth} = this.props;

    const radialGradient = 'radial-gradient(circle at ' + 2.5*lineWidth + 'px ' +
                            2.5*lineWidth + 'px, ' + player.stoneColor + ', #000)'


    return (
      <figure  style = {{ 'display': 'inline-block',
                          'borderRadius': '100%',
                          'height': 8*lineWidth,
                          'width': 8*lineWidth,
                          'margin': 0,
                          'marginLeft': 4*lineWidth,
                          'verticalAlign': 'middle',
                          'background':radialGradient,
                      opacity: 0.7,
                      transform: 'scale(1.8)'
                    }}></figure>
		)
	}
}
