import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import Camera from '../Camera/Camera';
import Chatbot from 'react-chatbot-kit';
import config from '../../chatbot/config';
import ActionProvider from '../../chatbot/ActionProvider';
import MessageParser from '../../chatbot/MessageParser'; 


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
          <Chatbot config={config} 
          actionProvider={ActionProvider} 
          messageParser={MessageParser}/>
        </div>
    </div>


};

export default Doctor;
