import React, { useState } from "react";
import Button from "@mui/material/Button";

const Diagnosis = () => {

  const email = localStorage.getItem("email");
  const [premiumUser, setPremiumUser] = useState(false)

  const askExpert = () => {

    if(email === "mmartindj@gmail.com"){
      setPremiumUser(true);

    }else{
      console.log("paga, rácano")
    }
  }


  return (
    <section className="diagnosis">
      {!premiumUser ?
      <>
      <img src="https://cdn.pixabay.com/photo/2016/04/06/17/42/silhouette-1312359_960_720.png" alt="pez" height="250px" />
      <Button
          onClick={() => {
            askExpert()
          }}
          variant="outlined"
        >
          Rellenar cuestionario
        </Button></> :
        <p>Aquí meter formulario</p>
      }
    </section>
  );
};

export default Diagnosis;
