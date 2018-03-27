import React from 'react';

import PlayersBoxList from './playerboxlist.js'
import ChangeTurn from './changeturn.js'

const SideSection = () => {return (
    <div className = "side-bar">
      <PlayersBoxList/>
      <ChangeTurn/>
    </div>
  );
}

export {SideSection}
