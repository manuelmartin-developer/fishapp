import React, { useEffect, useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { photoContext } from "../../contexts/photoContext";
import Header  from "../Header/Header"

import "./Profile.scss"

export const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { photo, setPhoto } = useContext(photoContext);

  useEffect(()=> {
    if(isAuthenticated){
      localStorage.setItem("email", user.email);
      localStorage.setItem("isLogged", true);
    }
  }, [user.email, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return <section > 

    <Header/>
    <div className="profile">
    {isAuthenticated && (
      <>
      <div className="profile-image">
        <p>{user.url}</p>
      </div>
      <div className="profile-name">
        <p>{user.name}</p>
      </div>
      
      <div className="profile-email">
        <p>{user.email}</p>
      </div>

      <div className="profile-atributes">
        <div className="profile-pics">
            <img src="assets/Profile/pezcaptura.png" alt="" />
            <p>3</p>
        </div>
        <div className="profile-acuario">
            <img src="assets/Profile/pecepequeña.png" alt="" />
            <p>3</p>
        </div>
        <div className="profile-heart">
            <img src="assets/Profile/Corazon.png" alt="" />
            <p>3</p>
        </div>
      </div>

      <button className="profile-button" >SALIR</button>
      
      </>
      



    )}</div>
    

    </section>
}; 

export default Profile