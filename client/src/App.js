import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './styles/styles.scss';
import { fishContext } from './contexts/fishContext';
import { photoContext } from './contexts/photoContext';
import SplashScreen from "./components/SplashScreen";
import Onboarding from './components/Onboarding';

function App() {

  const [fishName, setFishName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const onboarding = localStorage.getItem("onboarding");

  useEffect(() => {
  
    // Wait for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


  const fishData = {
    fishName: fishName,
    setFishName: setFishName
  };
  const photoData = {
    photo: photo,
    setPhoto: setPhoto
  };

  return (
    
    loading ?
      <SplashScreen /> :
    !onboarding ?

    <BrowserRouter>
      <Onboarding /> 
    </BrowserRouter>
    :

    <BrowserRouter>
    <photoContext.Provider value={photoData}>
      <fishContext.Provider value={fishData}>
        <Main />
      </fishContext.Provider>
    </photoContext.Provider>
        <Nav />
    </BrowserRouter>
    
    
  );
}

export default App;
