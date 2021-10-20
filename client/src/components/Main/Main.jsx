import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from '../Home'


const Main = () => {
  return (
    <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/"/>
          <Route path="/"/>  
        </Switch>
    </main>
  );
};

export default Main;
