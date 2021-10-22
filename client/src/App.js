import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './styles/styles.scss';
import { fishContext } from './contexts/fishContext';
import { photoContext } from './contexts/photoContext';

function App() {

  const [fishName, setFishName] = useState("Guppy");
  const [photo, setPhoto] = useState("");


  const fishData = {
    fishName: fishName,
    setFishName: setFishName
  };
  const photoData = {
    photo: photo,
    setPhoto: setPhoto
  };


  return (
    (
      <BrowserRouter>
      <photoContext.Provider value={photoData}>
        <fishContext.Provider value={fishData}>
          <Main />
        </fishContext.Provider>
      </photoContext.Provider>
          <Nav />
      </BrowserRouter>
    )
  );
}

export default App;
