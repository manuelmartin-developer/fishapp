import React, { useContext, useEffect, useState } from "react";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from "../../contexts/photoContext";
import { Mixin } from "../../hooks/useToast";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import axios from "axios";

const Details = () => {
  const { fishName, setFishName } = useContext(fishContext);
  const { photo } = useContext(photoContext);
  const [details, setDetails] = useState([]);
  const isLogged = localStorage.getItem("isLogged");
  const email = localStorage.getItem("email");

  const addMyAquarium = async () => {
    const refCollection = app.firestore().collection("images");
    const docFile = await refCollection.doc().set({ email: email, url: photo });
    Mixin.fire({
      icon: "success",
      title: "El pez ha sido agregado a Mi Acuario",
    });
  };

  useEffect(() => {
    const payload = { name: fishName };

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    (async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/details",
          payload,
          options
        );

        setDetails(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fishName]);

  console.log(details); // Borrar

  return (
    <section className="details">
      <p>{fishName}</p>
      {isLogged === null ? (
        <Link to="/aquarium">
          <Button to="/aquarium" variant="outlined">
            Login
          </Button>
        </Link>
      ) : (
        <Button
          onClick={() => {
            addMyAquarium();
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
