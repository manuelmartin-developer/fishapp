import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Nav";
import Header from "../Header";
import Search from "../Search";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { fishContext } from "../../contexts/fishContext";

const Home = () => {
  const history = useHistory();
  const { details } = useContext(fishContext);

  useEffect(() => {
    if (details) {
      history.push("/details");
    }
  }, [details, history]);
  return (
    <section className="home-container">
      <Search className="home-search" />
      <Stack direction="row" spacing={2}>
        <button className="home-avatar">
          <Avatar sx={{ width: 28, height: 28
 }} alt="Remy Sharp" src="" />
        </button>
      </Stack>
      <section className="home">
        <div className="home-menu">
          <p className="home-menu-title">Bienvenido a</p>
          <div className="home-menu-buttons">
            <button onClick={()=> {history.push("/camera")}} className="home-menu-buttons__camera"><img src="assets/Home/camera.png" alt="camera_btn" /></button>
            <button onClick={()=> {history.push("/diagnosis")}} className="home-menu-buttons__diagnosis"><img src="assets/Home/diagnosis.png" alt="diagnosis_btn" /></button>
            <button onClick={()=> {history.push("/expert")}} className="home-menu-buttons__expert"><img src="assets/Home/expert.png" alt="expert_btn" /></button>
            <button onClick={()=> {history.push("/aquarium")}} className="home-menu-buttons__aquarium"><img src="assets/Home/aquarium.png" alt="aquarium_btn" /></button>
          </div>
        </div>
      </section>
      <Header />
      <Nav />
    </section>
  );
};

export default Home;
