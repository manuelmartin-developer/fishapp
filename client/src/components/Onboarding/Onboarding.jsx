import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import { Link } from "react-router-dom";

const Onboarding = () => {
  let plugins = [new Pagination({ type: "bullet" })];

  const skip = () => {
    localStorage.setItem("onboarding", false);
    window.location.reload();
  };

  return (
    <section className="onboarding">
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
          <img src="assets/1.png" alt="" height="600px" />
        </div>
        <div className="onboarding-step">
          <button onClick={() => skip()}>Saltar</button>
          <img src="assets/2.png" alt="" height="600px" />
        </div>
        <div className="onboarding-step">
          <button onClick={() => skip()}>Saltar</button>
          <img src="assets/3.png" alt="" height="600px" />
        </div>
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>
      </section>
  );
};

export default Onboarding;
