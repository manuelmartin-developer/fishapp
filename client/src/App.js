import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './styles/styles.scss';
import { userContext } from './contexts/userContext'

function App() {

  const [userLogged, setUserLogged] = useState(false);

  const userData = {
    userLogged: userLogged,
    setUserLogged: setUserLogged
  };

  return (
    (
      <BrowserRouter>
      <userContext.Provider value={userData}>
        <Main />
        <Nav />
      </userContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;
