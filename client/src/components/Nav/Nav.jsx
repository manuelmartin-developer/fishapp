import React from "react";
import { Switch, Route } from 'react-router-dom';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import Home from "@mui/icons-material/Home";
import Camera from "@mui/icons-material/Camera";
import SetMeal from "@mui/icons-material/SetMeal";
import Aquarium from "../Aquarium"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScienceIcon from "@mui/icons-material/Science";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {
  const [value, setValue] = React.useState("recents");


  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        paddingRight:2,
        paddingLeft: 2
      }}
      elevation={3}
    >
      
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
          icon={<Home />}
        />

    
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Acuario"
          component={Link}
          to="/aquarium"
          icon={<SetMeal />}
        />
    
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1}}
          label="Identificar"
          component={Link}
          to="/camera"
          icon={<Camera />}
        />
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Diagnóstico"
          component={Link}
          to="/diagnosis"
          icon={<ScienceIcon />}
        />
        <BottomNavigationAction
          sx={{ paddingLeft: 1, paddingRight: 1 }}
          label="Experto"
          component={Link}
          to="/expert"
          icon={<LocalHospitalIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Nav;
