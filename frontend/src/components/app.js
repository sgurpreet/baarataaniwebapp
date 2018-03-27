import React from 'react';

import NavBar from './navbar.js'
import Header from './header.js'
import MainPanel from './mainpanel.js'


class App extends React.Component {
  render() {
    return (
       <React.Fragment>
        <Header/>
        <NavBar/>
        <MainPanel/>
      </React.Fragment>
    );
  }
}

export default App
