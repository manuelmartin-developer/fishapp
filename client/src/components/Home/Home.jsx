import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Nav";
import HeaderLogo from "../HeaderLogo";
import Search from "../Search";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { fishContext } from "../../contexts/fishContext";
import Onboarding from "../Onboarding"

const Home = () => {
  const history = useHistory();
  const { fishName } = useContext(fishContext);

  useEffect(() => {
    if (fishName) {
      history.push("/details");
    }
  }, [fishName]);
  return (
    <>
      <HeaderLogo />

    <section className="home-container">
    <div className="home-container-navSearch">
      <Search className="home-search" />
      <img id="lupa" src="assets/Home/lupa.svg" alt="lupa_icon" />
      <button className="home-avatar" onClick={()=> {history.push("/profile")}}>
          <Avatar sx={{ width: 28, height: 28
            }} alt="Remy Sharp" src="assets/Home/group.png" />
        </button>
    </div>
      <section className="home">
        <div className="home-menu">
          <p className="home-menu-title">Aprende sobre tus peces</p>
          <div className="home-menu-buttons">
            <button onClick={()=> {history.push("/camera")}} className="home-menu-buttons__camera"><img src="assets/Home/identificador.png" alt="camera_btn" /></button>
            <button onClick={()=> {history.push("/expert")}} className="home-menu-buttons__diagnosis"><img src="assets/Home/experto.png" alt="diagnosis_btn" /></button>
            <button onClick={()=> {history.push("/aquarium")}} className="home-menu-buttons__expert"><img src="assets/Home/miacuario.png" alt="expert_btn" /></button>
            <button onClick={()=> {history.push("/diagnosis")}} className="home-menu-buttons__aquarium"><img src="assets/Home/diagnostico.png" alt="aquarium_btn" /></button>
          </div>
        </div>
      </section>
    </section>
    <Nav />
    </>
  );
};

export default Home;
