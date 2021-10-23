import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import Camera from '../Camera/Camera'


const Doctor = () => {

  const { isAuthenticated } = useAuth0(); 
  
  const [showCamera, setShowCamera] = useState(false); 





  return <div className="nav">

      <ul className="nav_links">
      </ul>
        <div>
        <button onClick={() => setShowCamera(!showCamera)}>
                      Enviar fotoconsulta</button>
                    {showCamera && <Camera/>}
        </div>
        <div>
        </div>
    </div>


};

export default Doctor;
