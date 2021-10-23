import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Camera from "../Camera";
import Aquarium from "../Aquarium"
import Details from "../Details";
import Search from "../Search";



const Main = () => {
  return (
    <main className="main">
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/camera" component={Camera}/>
          {/* <Route path="/expert" component={Expert}/>   */}
          <Route path="/aquarium" component={Aquarium}/>
          <Route path="/details" component={Details}/>
          <Route path="/search" component={Search}/>
        </Switch>
    </main>
  );
};

export default Main;
