import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Camera from "../Camera";
import Aquarium from "../Aquarium"
import Details from "../Details";
import Search from "../Search";
import Doctor from "../Doctor";
import DrCard from "../DrCard"; 
import Diagnosis from "../Diagnosis"; 
import Profile from "../Profile"; 


const Main = () => {
  return (
    <main className="main">
      
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/camera" component={Camera}/>
          <Route path="/expert" component={Doctor}/>  
          <Route path="/aquarium" component={Aquarium}/>
          <Route path="/details" component={Details}/>
          <Route path="/diagnosis" component={Diagnosis}/>
          <Route path="/search" component={Search}/>
          <Route path="/expertcontact" component={DrCard}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
    </main>

  );
};

export default Main;
