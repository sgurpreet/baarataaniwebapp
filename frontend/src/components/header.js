import React from 'react';

class Header extends React.Component {

  render() {

      return (
            <React.Fragment>
              <div className="col-12 row">
                <img alt="Baara Taani" src={require('../css/images/baara_logo.jpg')} id="header">
                </img>
              </div>
            </React.Fragment>

      );
  }


}

export default Header;
