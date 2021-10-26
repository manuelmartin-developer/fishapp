import React from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {
  const [value, setValue] = React.useState("recents");


  return (
      <nav>
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
      </nav>
  );
};

export default Nav;

