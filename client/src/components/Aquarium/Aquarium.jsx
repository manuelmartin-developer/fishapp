import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import { Login }  from '../Login/Login'
import { Profile } from '../Profile/Profile'
import Header from '../Header/Header'
import { Logout } from '../Logout/Logout'
import Form from "../Form/Form";
import Camera from "../Camera/Camera"
import DrCam from "../DrCam/DrCam"

import "./Aquarium.scss"
import FamilyBook from "../familyBook/familyBook";

function Aquarium() {

  const { isAuthenticated } = useAuth0(); 
  
  const [ aquarium, setNewAquarium ] = useState(false)

  const [show, setShow] = useState(false); 

  const [showForm, setShowForm] = useState(false); 

  const start = () => {
    setNewAquarium(true)
  }


  return (
    <section className="aquarium">
    {!aquarium ? (
      <>
      <div className="conta">
          <img src="assets/Aquarium/Pecera.png" height="160px" alt="" className="pecera"/>
          <div className="class-div">
            <h3>Aún no has agregado preces a tu acuario</h3>
          </div>
          <div className="div-text">
            <p>¡Saca una foto a tu pez y que empiece la aventura!</p>
          </div>
          <button onClick={()=> {start()}} className="button-add">AÑADIR PEZ A MI ACUARIO</button>
      </div>
      </>

    ) : (

      <DrCam/>,
      <div className="nav">
            
              <ul className="nav_links">
              </ul>
                <div className="container-menu">
                  {isAuthenticated ? <>
                    <Logout/>
                    <Form/>
                   {/*  <Profile/> */}
                    {/* <Camera/> */}
                   {/*  {!showForm ? (
                    <FamilyBook/>  ) :(
                    <Form/>)} */}
                    </>
                    :
                    <>
                    <div className="container-login">
                      <p>Para registrar a tu pez, necesitas estar registrado</p>
                    <Login/>
                    </div>
                    </>
                      }
                      
                </div>
                <div>
                </div>
        </div>

    )

  }

   
    </section>
  )
}

export default Aquarium;







