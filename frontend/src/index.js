import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import registerServiceWorker from './registerServiceWorker';

import AppMouse from './components/appmouse.js'
import AppTouch from './components/apptouch.js'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./reducers/index.js"
//var App = react('components/App');


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const screenType = {
  Touch: 1,
  Mouse: 2
}

class LoadApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isScreenTypeAvailable: false, screenType: null};

    this.detectTouch = this.detectTouch.bind(this);

  }

  componentDidMount() {
    if (this.state.isScreenTypeAvailable === false)
    {
      this.root.addEventListener("touchstart", this.detectTouch);
    }
    else {
      this.root.removeEventListener("touchstart", this.detectTouch);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isScreenTypeAvailable === true)
    {
      this.root.removeEventListener("touchstart", this.detectTouch);
    }
  }

  componentWillUnmount() {
    this.root.removeEventListener("touchstart", this.detectTouch);
  }

  detectTouch(event) {
    console.log("Touch Start.");
    this.setState({isScreenTypeAvailable: true,
      screenType: screenType.Touch});
  }

  render() {
    return (
     <div ref={elem => this.root = elem} style={{'width': '100%'}}>
      { (this.state.isScreenTypeAvailable === false)&&<AppMouse/> }
      { (this.state.isScreenTypeAvailable === true && this.state.screenType === screenType.Touch) &&<AppTouch/> }
     </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <LoadApp />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
