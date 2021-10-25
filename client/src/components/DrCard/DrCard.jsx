import React, { useContext, useEffect, useState } from "react";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from "../../contexts/photoContext";
import { Mixin, Toast } from "../../hooks/useToast";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import "./DrCard.scss"

const DrCard = () => {



  const [value, setValue] = React.useState([]);
  
 /*  const { fishName, setFishName } = useContext(fishContext); */
  const { photo, setPhoto } = useContext(photoContext);
  const [details, setDetails] = useState([]);
  const isLogged = localStorage.getItem("isLogged");
  const email = localStorage.getItem("email");
  const history = useHistory();



  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const sendRequisition = async () => {
    if(isLogged){
      const refCollection = app.firestore().collection("images");
      const docFile = await refCollection.doc().set({ email: email, url: photo });
      Mixin.fire({
        icon: "success",
        title: "El pez ha sido agregado a Mi Acuario",
      });
      setPhoto("");
    }else{
      Toast.fire({
        icon: "info",
        title: "Mi Acuario",
        text: " Para guardar fotos debes estar loggeado"
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/");
        }
      });
    }
  }


  return (
    <section className="doctor-container">

    <form action="" onChange={handleChange} className="container-form">
      <h3>¿Qué síntomas tiene tu pez?</h3>
      <div>
      <textarea className="text-field"
          onChange={handleChange}

        />
      </div>
      <div className="confirmation-buttons">
        <button className="yes-button">Aceptar</button>
        <button className="cancelar-button">Cancelar</button>
      </div>
    </form>

    </section>
  );
};
export default DrCard;