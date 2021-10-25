import React, { useEffect, useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { photoContext } from "../../contexts/photoContext";

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

  return (
    isAuthenticated && (
      <>
      <div>
        <h2>{user.email}</h2>
      </div>
      <div className="container-profile">
        

      </div>
      </>
    )
  );
}; 

