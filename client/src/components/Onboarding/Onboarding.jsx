import React from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

const Onboarding = () => {

  return (
    <section className="onboarding">
      <Flicking
        align="center"
        circular={false}
        bound={true}
        bounce={"1%"}
        autoResize={true}
        resizeOnContentsReady={true}
        deceleration={0.0075}
        // duration={1000}
        onMoveEnd={(e) => {
          console.log("Fin");
        }}
      >
        <div className="onboarding-step">
          <img src="assets/1.png" alt="" />
        </div>
        <div className="onboarding-step">
          <img src="assets/2.png" alt="" />
        </div>
        <div className="onboarding-step">
          <img src="assets/3.png" alt="" />
        </div>
        <div className="onboarding-step">
          <button>END</button>
        </div>
      </Flicking>
    </section>
  );
};

export default Onboarding;
