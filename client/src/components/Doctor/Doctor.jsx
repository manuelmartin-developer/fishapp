import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import Camera from '../Camera/Camera';
import DrCam from '../DrCam/DrCam'
import Button from '@mui/material/Button'
import './Doctor.scss'
import Nav from "../Nav";
import HeaderLogo from "../HeaderLogo/HeaderLogo";


const Doctor = () => {

  const { isAuthenticated } = useAuth0(); 

  const [startConsulta, setStartConsulta] = useState(false); 

  const start = () => {

    setStartConsulta(true)

  }

  return <section className="doctor">
    

    {!startConsulta ? (
      <>
      <div className="doctor-container">
          <img src="assets/Aquarium/Espacio.png" height="160px" alt="" />
          <div className="doctor-class">
            <p className="doctor-class-text">¿Tienes dudas sobre tu pez?</p>
          </div>
          <div className="doctor-text">
            <p className="doctor-text-text">Nuestros especialistas prodrán resolver todas tus dudas</p>
          </div>
          <button onClick={()=> {start()}} className="doctor-buttonSend">ENVIAR FOTOCONSULTA</button>
      </div>
      <Nav/>
      <HeaderLogo/>
      </>

    ) : (

      <DrCam/>

    )
      
  }

  

  </section>
    
}

export default Doctor;
