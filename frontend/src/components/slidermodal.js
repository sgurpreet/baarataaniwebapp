import React from 'react';

class SliderModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
          )

  }

}

export {SliderModal}
