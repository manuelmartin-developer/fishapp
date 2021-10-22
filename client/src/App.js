import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './styles/styles.scss';
import { fishContext } from './contexts/fishContext';

function App() {

  const [fishName, setFishName] = useState("Guppy");


  const fishData = {
    fishName: fishName,
    setFishName: setFishName
  };

  return (
    (
      <BrowserRouter>
        <fishContext.Provider value={fishData}>
          <Main />
        </fishContext.Provider>
          <Nav />
      </BrowserRouter>
    )
  );
}

export default App;
