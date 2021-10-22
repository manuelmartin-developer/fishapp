import React, { useContext } from "react";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from '../../contexts/photoContext';
import { Mixin } from "../../hooks/useToast";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import { app } from '../../firebase';

const Details = () => {
  const { fishName, setFishName } = useContext(fishContext);
  const { photo } = useContext(photoContext);
  const isLogged = localStorage.getItem("isLogged");
  const email = localStorage.getItem("email");
  // Hacer fetch a API de peces para que devuelva características del pez


  const addMyAquarium = async () => {

    const refCollection = app.firestore().collection("images");
    const docFile = await refCollection.doc().set({email: email, url: photo});
    Mixin.fire({
      icon: "success",
      title: "El pez ha sido agregado a Mi Acuario",
    })
  };

 
  return (
    <section className="details">
      <p>{fishName}</p>
      {isLogged === null ? (
        <Link to="/aquarium"><Button
          to="/aquarium"
          variant="outlined"
        >
          Login
        </Button></Link>
      ) : (
        <Button
          onClick={() => {
            addMyAquarium()
          }}
          variant="outlined"
        >
          Agregar a mi acuario
        </Button>
      )}
    </section>
  );
};

export default Details;
