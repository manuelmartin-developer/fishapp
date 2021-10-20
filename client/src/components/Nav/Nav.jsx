import React from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from '@mui/material/BottomNavigation';
import Home from "@mui/icons-material/Home";
import Camera from "@mui/icons-material/Camera";
import SetMeal from "@mui/icons-material/SetMeal";
import Paper from "@mui/material/Paper";

import "./Nav.scss";

const Nav = () => {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
       <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Foto" icon={<Camera />} />
      <BottomNavigationAction label="Mi Acuario" icon={<SetMeal />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Nav;
