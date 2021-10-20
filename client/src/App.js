import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main/Main';
import './App.css';

function App() {
  return (
    (
      <div className="App">
      <BrowserRouter>
        <Main />
        <Nav />
      </BrowserRouter>
      </div>
      
  
    )
  );
}

export default App;
