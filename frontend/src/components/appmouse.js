import React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import App from './app.js'

class AppMouse extends React.Component {
  render() {
    return (
      <React.Fragment>
        <App/>
      </React.Fragment>
    );
  }
}

export default DragDropContext(HTML5Backend)(AppMouse);
