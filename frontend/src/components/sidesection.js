import React from 'react';

import PlayersBoxList from './playerboxlist.js'
import ChangeTurnSection from './changeturn.js'

const SideSection = () => {return (
    <div className = "side-bar">
      <PlayersBoxList/>
      <ChangeTurnSection/>
    </div>
  );
}

export {SideSection}
