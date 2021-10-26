import React, { useEffect, useState } from "react";
import { Toast } from "../../hooks/useToast";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Nav from "../Nav/Nav";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Diagnosis = () => {
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
  const [diseaseDescription, setDiseaseDescription] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [seeDiseases, setSeeDiseases] = useState(false);
  const [diseaseDetails, setDiseaseDetails] = useState(false);
  const fishNameImg = fishName.toLowerCase().replace(/ /g, "");


  const askExpert = () => {
    if (!email) {
      Toast.fire({
        icon: "info",
        title: "Mi Acuario",
        text: " Para esta funcionalidad debes estar loggeado",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/aquarium");
        }
      });
    }
    if (!premiumUser) {
      Toast.fire({
        icon: "info",
        title: "Mi Experto",
        text: " Esta en una funcionalidad premium",
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí llevaría a registro premium
          history.push("/home");
        }
      });
    } else {
      // Aquí redirigir a mi experto
      console.log("A mi experto");
    }
  };

  const seeForm = () => {
    setGoToForm(true);
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
      if (disease.sintoma === value) {
        setDisease(value);
        setDiseaseDescription(disease);
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
          console.log(response.data);
          setDiseases(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [fishLatinName]);
  const close = () => {
    Toast.fire({
      title: "¿Deseas salir sin guardar cambios?",
      text: "Si sale, no se guardarán los cambios realizados",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        setGoToForm(false);
        setFishName("");
        setFishLatinName("");
        setFishLatinName("");
        setFishName("");
        setDiseases([]);
        setDisease("");
        setDiseaseDescription([]);
        setSeeDiseases(false);
        history.push("/diagnosis");
      }
    });
  };
  useEffect(() => {
    if (disease) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const seeDiagnosis = () => {
    setSeeDiseases(true);
  };
  const seeDiagnosisDetails = () => {
    setDiseaseDetails(true);
  }

  console.log(diseaseDescription);
  
  if (!seeDiseases) {
    return (
      <section className="diagnosis">
        {!goToForm ? (
          <>
            <div className="diagnosis-container">
              <img
                src="assets/Diagnosis/peztirita.png"
                height="160px"
                alt=""
                className="pecera"
              />
              <div className="diagnosis-class">
                <p>¿Tu pez no tiene la apariencia habitual?</p>
              </div>
              <div className="diagnosis-text">
                <p>Rellena este breve cuestionario para saber qué le pasa</p>
              </div>
              <button
                onClick={() => {
                  seeForm();
                }}
                className="diagnosis-buttonAdd"
              >
                RELLENAR CUESTIONARIO
              </button>
            </div>
            <Nav className="diagnosis-nav" />
          </>
        ) : (
          <>
            <div className="diagnosis-close">
              <button className="camera-close-icon" onClick={() => close()}>
                <CloseIcon className="camera-close-icon__icon" />
              </button>
            </div>
            <div className="diagnosis-checklist">
              <p className="diagnosis-title">¿Qué síntomas tiene tu pez?</p>
              <img src="assets/Diagnosis/pezdiagnosis.png" alt="" />
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  onInputChange={handleInputChange}
                  options={fishesNames.map((option) => option.nombre)}
                  renderInput={(params) => (
                    <TextField
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
                  options={diseases.map((option) => option.sintoma)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona un síntoma"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
                <button
                  onClick={() => seeDiagnosis()}
                  disabled={isDisabled}
                  className={
                    isDisabled
                      ? "diagnosis-searchButton-disabled"
                      : "diagnosis-searchButton"
                  }
                >
                  VER DIAGNÓSTICO
                </button>
              </Stack>
            </div>
          </>
        )}
      </section>
    );
  } else {
    return (
      <section className="diagnosis">
        {!diseaseDetails ? (
          <>
            <div className="diagnosis-close">
              <button className="diagnosis-close-icon" onClick={() => close()}>
                <CloseIcon className="camera-close-icon__icon" />
              </button>
            </div>
            <div className="details-fishname">Diagnostico</div>
            <div className="details-photo">
              <img src={`assets/Details/${fishNameImg}.jpg`} alt="fish_photo" />
            </div>
            <div className="details-title">
              <img src="assets/Details/oval.png" alt="oval_icon" />
              <h2>Posibles enfermedades</h2>
            </div>
            <div className="diagnosis-disease">
              <div>
                <p>{diseaseDescription.enfermedad}</p>
                <p>{diseaseDescription.caracteristicas}</p>
              </div>
              <button onClick={() => seeDiagnosisDetails()} className="">
                <ArrowForwardIosIcon className="" />
              </button>
            </div>
          </>
        ) : (
          <>
          <div className="diagnosis-close">
            <button className="diagnosis-close-icon" onClick={() => close()}>
              <CloseIcon className="camera-close-icon__icon" />
            </button>
          </div>
          <div className="details-fishname">{diseaseDescription.enfermedad}</div>
          <div className="details-photo">
            <img src={`assets/Details/${fishNameImg}.jpg`} alt="fish_photo" />
          </div>
          <div className="details-title">
            <img src="assets/Details/oval.png" alt="oval_icon" />
            <h2>Principales síntomas</h2>
          </div>
          <div className="diagnosis-disease">
            <div>
              <p>Principal síntoma:</p>
              <p>{diseaseDescription.sintoma}</p>
              <p>Otros síntomas:</p>
              <p>{diseaseDescription.otros}</p>
            </div>
          </div>
          <div className="details-title">
            <img src="assets/Details/oval.png" alt="oval_icon" />
            <h2>Descripción enfermedad:</h2>
          </div>
          <div>
              <p>{diseaseDescription.caracteristicas}</p>
          </div>
          <div className="details-title">
            <img src="assets/Details/oval.png" alt="oval_icon" />
            <h2>Tratamiento:</h2>
          </div>
          <div>
              <p>{diseaseDescription.tratamiento}</p>
          </div>
          <button
                onClick={() => {
                  askExpert();
                }}
                className="diagnosis-buttonAdd"
              >
                HABLAR CON EXPERTO
              </button>
        </>
        )}
      </section>
    );
  }
};

export default Diagnosis;
