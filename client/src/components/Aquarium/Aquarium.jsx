import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import { Login }  from '../Login/Login'
import { Profile } from '../Profile/Profile'
import { Logout } from '../Logout/Logout'
import Form from "../Form/Form";


function Aquarium() {

  const { isAuthenticated } = useAuth0(); 

  return (
    <>
        <div className="nav">
              <div className="nav_logo">
              <h3>FullFish</h3>
              </div>

              <ul className="nav_links">
              </ul>
                <div>
                  {isAuthenticated ? <>
                    <Profile/>
                    <Form/>
                    <Logout/>
                    </>
                    : <Login/> }
                </div>
                <div>
                </div>
        </div>
    
    </>
  )
}

export default Aquarium;
