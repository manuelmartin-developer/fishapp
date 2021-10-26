import React, { useEffect, useContext, useRef } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header/Header";

import "./Profile.scss";
import Nav from "../Nav";

export const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    if(isAuthenticated && user){
      localStorage.setItem("email", user.email)
    }
  }, [isAuthenticated, user]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <section className="profile">
        {isAuthenticated ? (
          <>
            <div className="profile-data">
              <div className="profile-image">
                <p>{user.picture}</p>
              </div>
              <div className="profile-name">
                <p>{user.name}</p>
              </div>
              <div className="profile-email">
                <p>{user.email}</p>
              </div>
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
            <button className="profile-button" onClick={() => logout(
              {isAuthenticated: false, returnTo: window.localStorage.removeItem("email")}
            )}>
              Logout
            </button>
            ;
          </>
        ) : (
          <>
            <button
              className="profile-button"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          </>
        )}
        
      </section>
      <Header />
      <Nav/>
    </>
  );
};

export default Profile;
