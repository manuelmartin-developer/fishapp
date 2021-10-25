import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import Camera from '../Camera/Camera';
import DrCam from '../DrCam/DrCam'
import Button from '@mui/material/Button'
import './Doctor.scss'


const Doctor = () => {

  const { isAuthenticated } = useAuth0(); 

  const [startConsulta, setStartConsulta] = useState(false); 

  const start = () => {

    setStartConsulta(true)

  }

  return <div className="container-button">
  
    {!startConsulta ? (
      <>
      <div className="conta">
          <img src="assets/Aquarium/Espacio.png" height="160px" alt="" />
          <div className="class-div">
            <h3>¿Tienes dudas sobre tu pez?</h3>
          </div>
          <div className="div-text">
            <p>Nuestros especialistas prodrán resolver todas tus dudas</p>
          </div>
          <button onClick={()=> {start()}}>ENVIAR FOTOCONSULTA</button>
      </div>
      </>

    ) : (

      <DrCam/>

    )

  }  </div>
    
}

export default Doctor;
