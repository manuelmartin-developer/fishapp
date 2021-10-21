import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './styles/styles.scss';
import { userContext } from './contexts/userContext'
import { onboardingContext } from './contexts/onboardingContext'
import { fishContext } from './contexts/fishContext';

function App() {

  const [userLogged, setUserLogged] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [fishName, setFishName] = useState("Guppy");

  const userData = {
    userLogged: userLogged,
    setUserLogged: setUserLogged
  };
  const onboardingData = {
    isFirstTime: isFirstTime,
    setIsFirstTime: setIsFirstTime
  };
  const fishData = {
    fishName: fishName,
    setFishName: setFishName
  };

  return (
    (
      <BrowserRouter>
        <userContext.Provider value={userData}>
        <onboardingContext.Provider value={onboardingData}>
        <fishContext.Provider value={fishData}>
          <Main />
        </fishContext.Provider>
          <Nav />
        </onboardingContext.Provider>
        </userContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;
