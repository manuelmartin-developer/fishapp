import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Toast } from "../../hooks/useToast";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



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
  const [diseaseDescription, setDiseaseDescription] = useState("");

  const askExpert = () => {
    if (!isLogged) {
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
    if(!premiumUser){
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
    }else{
      // Aquí redirigir a mi experto
      console.log("A mi experto")
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

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Diagnóstico
        </Typography>
        <Typography variant="h4" component="div">
          {fishName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {fishLatinName}
        </Typography>
        <Typography variant="h5" component="div">
          {disease}
        </Typography>
        <Typography variant="body2">
          {diseaseDescription}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={askExpert} size="small">
          Hablar con experto
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <section className="diagnosis">
      {!goToForm ? (
        <>
          <img
            src="https://cdn.pixabay.com/photo/2016/04/06/17/42/silhouette-1312359_960_720.png"
            alt="pez"
            height="250px"
          />
          <Button
            onClick={() => {
              seeForm();
            }}
            variant="outlined"
          >
            Rellenar cuestionario
          </Button>
        </>
      ) : (
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
            options={diseases.map((option) => option.enfermedad)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecciona enfermedad"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>
      )}
      {disease ? (
        <>
          <br />
          <Box sx={{ width: 300 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </>
      ) : (
        <p></p>
      )}
    </section>
  );
};

export default Diagnosis;
