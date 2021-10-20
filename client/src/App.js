import React from 'react';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home'
import './App.css';

function App() {
  return (
    (
      <BrowserRouter>
      <div className="App">
        <Header/>
       <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/"/>
          <Route path="/"/>  
        </Switch>
       </main>
      </div>
      </BrowserRouter>
      
  
    )
  );
}

export default App;
