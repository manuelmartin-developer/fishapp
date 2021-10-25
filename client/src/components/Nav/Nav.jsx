import React from "react";
import { Switch, Route } from 'react-router-dom';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import Home from "@mui/icons-material/Home";
import Camera from "@mui/icons-material/Camera";
import SetMeal from "@mui/icons-material/SetMeal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faStethoscope, faVial } from '@fortawesome/free-solid-svg-icons';
import Aquarium from "../Aquarium"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScienceIcon from "@mui/icons-material/Science";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {
  const [value, setValue] = React.useState("recents");


  return (
  
      
      <BottomNavigation
        sx={{ width: "100%", }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
      
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Home"
          component={Link}
          to="/"
          icon={<img src="assets/Nav/home.svg" alt="nav_home"/>}
        />

    
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Acuario"
          component={Link}
          to="/aquarium"
          icon={<img src="assets/Nav/aquarium.svg" alt="nav_aquarium"/>}
        />
    
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1, height:20}}
          label="Identificar"
          component={Link}
          to="/camera"
          icon={<img src="assets/Nav/central.png" alt="nav_identify"/>}
        />
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Diagnóstico"
          component={Link}
          to="/diagnosis"
          icon={<img src="assets/Nav/diagnosis.svg" alt="nav_diagnosis"/>}
        />
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Experto"
          component={Link}
          to="/expert"
          icon={<img src="assets/Nav/expert.svg" alt="nav_expert"/> }
        />
      </BottomNavigation>

  );
};

export default Nav;
