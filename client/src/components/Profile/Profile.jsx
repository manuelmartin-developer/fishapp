import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.scss";
import Nav from "../Nav";
import Header from "../Header";

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
                <img src={user.picture} alt="" />
              </div>
              <div className="profile-name">
                <p>{user.name}</p>
              </div>
              <div className="profile-email">
                <p>{user.email}</p>
              </div>
            </div>
            <div className="profile-atributes">
              <div className="profile-atributes-pics">
                <img src="assets/Profile/pezcaptura.png" alt="" />
                <p>03</p>
              </div>
              <div className="profile-atributes-acuario">
                <img src="assets/Profile/pecepequeña.png" alt="" />
                <p>03</p>
              </div>
              <div className="profile-atributes-heart">
                <img src="assets/Profile/Corazon.png" alt="" />
                <p>03</p>
              </div>
            </div>
            <div className="profile-textos">
              <div className="profile-textos-escaneados">
                <p>Peces escaneados</p>
              </div>
              <div className="profile-textos-acuario">
                <p>Peces en acuario</p>
              </div>
              <div className="profile-textos-favoritos">
                <p>Peces favoritos</p>
              </div>
            </div>
            <button className="profile-button" onClick={() => logout(
              {isAuthenticated: false, returnTo: window.localStorage.removeItem("email")}
            )}>
              CERRAR SESIÓN
            </button>
          </>
        ) : (
          <>
          <div className="profile-data">
              <div className="profile-image">
                <img src="assets/Profile/L.png" alt="" /> 
              </div>
              <div className="profile-name">
                <p></p>
              </div>
              <div className="profile-email">
                <p></p>
              </div>
            </div>
            <div className="profile-atributes">
              <div className="profile-atributes-pics">
                <img src="assets/Profile/pezcaptura.png" alt="" />
                <p>00</p>
              </div>
              <div className="profile-atributes-acuario">
                <img src="assets/Profile/pecepequeña.png" alt="" />
                <p>00</p>
              </div>
              <div className="profile-atributes-heart">
                <img src="assets/Profile/Corazon.png" alt="" />
                <p>00</p>
              </div>
            </div>
            <div className="profile-textos">
              <div className="profile-textos-escaneados">
                <p>Peces escaneados</p>
              </div>
              <div className="profile-textos-acuario">
                <p>Peces en acuario</p>
              </div>
              <div className="profile-textos-favoritos">
                <p>Peces favoritos</p>
              </div>
            </div>
            <button
              className="profile-button"
              onClick={() => loginWithRedirect()}
            >
              INICIAR SESIÓN
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
