import React from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Link } from 'react-router-dom';

const Onboarding = () => {



  const skip = () => {
    localStorage.setItem("onboarding", false);

  }

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
          localStorage.setItem("onboarding", false);
        }}
      >
        <div className="onboarding-step">
        <Link to="/"><button onClick={()=>skip()}>Saltar</button></Link>
          <img src="assets/1.png" alt="" height="600px"  />
        </div>
        <div className="onboarding-step">
        <button onClick={()=>skip()}>Saltar</button>
          <img src="assets/2.png" alt="" height="600px" />
        </div>
        <div className="onboarding-step">
        <button onClick={()=>skip()}>Saltar</button>
          <img src="assets/3.png" alt="" height="600px" />
        </div>
      </Flicking>
    </section>
  );
};

export default Onboarding;
