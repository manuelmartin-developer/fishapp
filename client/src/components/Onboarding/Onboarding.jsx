import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import { Link } from "react-router-dom";
import HeaderOn from "../HeaderOn/HeaderOn";

import "./Onboarding.scss"

const Onboarding = () => {
  let plugins = [new Pagination({ type: "bullet" })];

  const skip = () => {
    localStorage.setItem("onboarding", false);
    window.location.reload();
  };

  return (
    <section className="onboarding">
    <HeaderOn/>
    <Flicking
        align="next"
        circular={false}
        bound={true}
        bounce={"1%"}
        autoResize={true}
        resizeOnContentsReady={true}
        deceleration={0.0075}
        plugins={plugins}
      >
        <div className="onboarding-step">
          <button onClick={() => skip()}>Saltar</button>
          <img src="assets/Onboarding/pagina2s.png" alt="" height="600px" />
        </div>
        <div className="onboarding-step">
          <button onClick={() => skip()}>Saltar</button>
          <img src="assets/Onboarding/pagina3s.png" alt="" height="400px" />
        </div>
        <div className="onboarding-step">
          <button onClick={() => skip()}>Saltar</button>
          <img src="assets/Onboarding/pagina4s.png" alt="" height="400px" />
        </div>
        <div className="onboarding-step">
          <button onClick={() => skip()}>Saltar</button>
          <img src="assets/Onboarding/pagina5s.png" alt="" height="400px" />
        </div>
        <div className="onboarding-step">
          <img src="assets/Onboarding/pagina6s.png" alt="" height="400px" />
          <button className="onboarding-final-init" id="init" onClick={() => skip()}>Comenzar</button>
        </div>
      
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>
      </section>
  );
};

export default Onboarding;
