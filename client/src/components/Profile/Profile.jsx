import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(()=> {
    if(isAuthenticated){
      localStorage.setItem("email", user.email);
      localStorage.setItem("isLogged", true);
    }
  }, [user.email]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>{user.email}</h2>
      </div>
    )
  );
}; 

