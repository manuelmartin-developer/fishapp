import React, { useEffect, useState } from "react";
import { Toast, Mixin } from "../../hooks/useToast";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";



import "./DrCard.scss"

const DrCard = () => {
  const email = localStorage.getItem("email");
  const [isLogged, setIslogged] = useState(false);
  const [premiumUser, setPremiumUser] = useState(false);
  const [goToForm, setGoToForm] = useState(false);
  const history = useHistory();
  const [fishName, setFishName] = useState("");
  const [fishLatinName, setFishLatinName] = useState("");
  const [fishesNames, setFisheshName] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [disease, setDisease] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");


  const sendConsulta = () => {
    if (!email) {
      Toast.fire({
        title: "Mi Acuario",
        confirmButtonText: "LOGIN",
        text: " Para esta funcionalidad debes estar loggeado",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/profile");
        }
      });
    }
    if(isLogged === true){
      Toast.fire({
        title: "Mi consulta",
        text: "¿Deseas mandar tu consulta? Nuestros especialistas se pondrán en contacto una vez recibida.",
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí llevaría a registro premium
          history.push("/");
          Mixin.fire({
            position: "center",
            title: "Su consulta ha sido recibida",
          });
        }
      });
    }else{
      // Aquí redirigir a mi experto
      console.log("A mi experto")
    }
  };

  const seeForm = () => {
    setGoToForm(true);
  };


  const backHome = () => {
    history.push('/')
  }


  const close = () => {
    Toast.fire({
      title: "¿Desea salir sin guardar cambios?",
      text: "Si sales, no se guardarán los cambios realizados",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      }
    });
  };


  const handleInputChange = (event, value) => {
    setDisease("");
    for (let fish of fishesNames) {
      if (fish.nombre === value) {
        setFishName(value);
        break;
      } else {
        setFishName("");
      }
    }
  };

  const handleInputChange2 = (event, value) => {
    for (let disease of diseases) {
      if (disease.enfermedad === value) {
        setDisease(value);
        setDiseaseDescription(disease.caracteristicas);
        break;
      } else {
        setDisease("");
      }
    }
  };

  useEffect(() => {
    if (email === "mmartindj@gmail.com") {
      setIslogged(true);
      setPremiumUser(true);
    } else if (email) {
      setIslogged(true);
    }
  }, [email]);


  useEffect(() => {
    if (fishesNames.length === 0) {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      (async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/names",
            options
          );

          setFisheshName(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }

    if (fishName) {
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

          setFishLatinName(response.data[0].latin);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [fishName, fishesNames]);

  useEffect(() => {
    if (fishLatinName) {
      const payload = { name: fishLatinName };

      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      (async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/diagnosis",
            payload,
            options
          );

          setDiseases(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [fishLatinName]);

  
  return (
    <section className="consulta">

        <div className="diagnosis-close">
              <button className="diagnosis-close-icon2" onClick={() => close()}>
                <CloseIcon className="diagnosis-close-icon__icon" />
              </button>
        </div>
     
        <div className="consulta-checklist">
          <p className="consulta-title">¿Qué síntomas tiene tu pez?</p>
        <Stack spacing={2} sx={{ width: 350 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onInputChange={handleInputChange}
            options={fishesNames.map((option) => option.nombre)}
            renderInput={(params) => (
              <TextField  className="input-custom"
                {...params}
                label="Busca un pez"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Autocomplete
            freeSolo
            id="free-solo-3-demo"
            disableClearable
            onInputChange={handleInputChange2}
            options={diseases.map((option) => option.enfermedad)}
            renderInput={(params) => (
              <TextField className="input-custom"
                {...params}
                label="Síntoma 1"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Autocomplete
            label="text-area"
            freeSolo
            id="free-solo-3-demo"
            disableClearable
            onInputChange={handleInputChange2}
            options={diseases.map((option) => option.enfermedad)}
            renderInput={(params) => (
              <TextField className="input-custom"
                {...params}
                label="Síntoma 2"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <TextField
                    id="outlined-multiline-static"
                    label="Observaciones"
                    multiline
                    rows={4}
                
                  />
                
                <div className="consulta-setButton">
                  <button onClick={() => {sendConsulta()}}className="consulta-searchButton">ACEPTAR</button>
                  <button onClick={()=> {backHome()}} className="consulta-searchButton-no">CANCELAR</button>
                </div>
        </Stack>
        </div>
    </section>
  );
};

export default DrCard;
