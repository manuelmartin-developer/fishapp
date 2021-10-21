import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './styles/styles.scss';
import { userContext } from './contexts/userContext'
import { onboardingContext } from './contexts/onboardingContext'

function App() {

  const [userLogged, setUserLogged] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const userData = {
    userLogged: userLogged,
    setUserLogged: setUserLogged
  };
  const onboardingData = {
    isFirstTime: isFirstTime,
    setIsFirstTime: setIsFirstTime
  };

  return (
    (
      <BrowserRouter>
      <userContext.Provider value={userData}>
      <onboardingContext.Provider value={onboardingData}>
        <Main />
        <Nav />
      </onboardingContext.Provider>
      </userContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;
