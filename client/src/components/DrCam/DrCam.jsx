import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from "@mui/material/CircularProgress";
import CameraIcon from "@mui/icons-material/Camera";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Toast } from "../../hooks/useToast";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from "../../contexts/photoContext";

import axios from "axios";
import './DrCam.scss'




const DrCam = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  /* const { fishName, setFishName } = useContext(fishContext); */
  const { photo, setPhoto } = useContext(photoContext);
  const photoTips = localStorage.getItem("photoTips");

  const videoConstraints = {
    width: 360,
    height: 500,
    facingMode: "user",
    // Cambiar en producción para activar la cámara trasera
    // facingMode: { exact: "environment" },
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 224,
      height: 224,
    });
    setPhoto(imageSrc);
   /*  setFishName("guppy") */
    Toast.fire({
      title: "¿Desea usar esta foto?",
      text: "Si sale, no se guardarán los cambios realizados",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        setPhoto("");
        history.push("/expertcontact");
    }
  });
};

const close = () => {
  Toast.fire({
    title: "¿Deseas salir sin guardar cambios?",
    text: "Si sale, no se guardarán los cambios realizados",
    confirmButtonText: "SI",
  }).then((result) => {
    if (result.isConfirmed) {
      setPhoto("");
      history.push("/");

    }
  });
};


  const reset = () => {
    setPhoto("");
  };

  const goToDrCard = () => {
    history.push("/expertcontact");
    setPhoto()
  };

  const goToHome = () => {
    history.push("/home")
  }

  useEffect(() => {
    if (!photoTips) {
      Toast.fire({
        title: "<strong>¿Te preocupa tu mascota?</strong>",
        icon: "info",
        html:
          '<img src="https://www.hogarmania.com/archivos/201105/killi-nothobranchius-rachovii-xl-668x400x80xX.jpg"/> ' +
          "Fotografía a tu pez e intentaremos ayudarte",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "ok",
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("photoTips", false); //cuando el local storage sea falso, ya no se volverá a visualizar el mensaje. 
        }
      });
    }

    // Enviar photo a endpoint
    /**
     * response ok:
     * setIdentified(true)
     * response error:
     * Volver a tomar foto o buscar por nombre
     */

    // return () => setFishName("")
  }, [photo]);

  /* console.log(fishName) */

  return (
    <section className="camera">
      {!photo ? (
        <>
          <Webcam
            audio={false}
            className="camera-webcam"
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={"100%"}
            videoConstraints={videoConstraints}
            screenshotQuality={1}
          />
            <div className="camera-close">
              <button className="camera-close-icon" onClick={() => close()}>
                <CloseIcon className="camera-close-icon__icon" />
              </button>
            </div>
            <div className="camera-capture-icon">
              <button
                className="camera-capture-icon__icon"
                onClick={() => capture()}
              >
              <img src="assets/Camera/burbuja.svg" alt="" />
            </button>
          </div>
        </>
      ) : (
        <>
          {photo ? (
            <>
              <div className="camera-capture">
                <img src={photo} alt="cam_capture" />
              </div>
              <div className="camera-close-icon">
      
              </div>
            </>
          ) : (
            <div className="camera-no-identify">
              <h1>No identificado</h1>
              <button onClick={() => reset()}>Volver a tomar foto</button>
             {/*  <button onClick={() => gotoSearch()}>Buscar por nombre</button> */}
            </div>
            
          )}
           <div className="camera-refresh">
                <button className="camera-refresh-icon" onClick={() => reset()}>
                  <RefreshIcon className="camera-refresh-icon__icon" />
                </button>
              </div>
        </>
      )}
    </section>
  );
};

export default DrCam;