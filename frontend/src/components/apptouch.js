import React from 'react';

import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import App from './app.js'

class AppTouch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <App/>
      </React.Fragment>
    );
  }
}

export default DragDropContext(TouchBackend({enableTouchEvents: true}))(AppTouch);
