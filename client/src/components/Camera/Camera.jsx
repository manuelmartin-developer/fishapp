import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import CameraIcon from "@mui/icons-material/Camera";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from "@mui/icons-material/Close";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import { Toast } from "../../hooks/useToast";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from "../../contexts/photoContext";
import axios from "axios";
import { switchClasses } from "@mui/material";
import Modal from 'rsuite/Modal';

const Camera = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { fishName, setFishName } = useContext(fishContext);
  const { photo, setPhoto } = useContext(photoContext);
  const photoTips = localStorage.getItem("photoTips");
  const fishNameImg = fishName.toLowerCase().replace(/ /g, "");




  const [facingMode, setFacingMode] = useState("user");
  // !Cambiar en producción
  // const [facingMode, setFacingMode] = useState({exact: 'environment'});
  const videoConstraints = {
    width: 360,
    height: 500,
    facingMode: facingMode
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      // width: 224,
      // height: 224,
    });
    setPhoto(imageSrc);

    setFishName("guppy");

    const payload = { data: photo };

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
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const close = () => {
    Toast.fire({
      icon: "info",
      title: "Deseas salir sin guardar?",
    }).then((result) => {
      if (result.isConfirmed) {
        setPhoto("");
        history.push("/");
      }
    });
  };

  const switchCamera = () => {
      facingMode === "user" ? setFacingMode({exact: 'environment'}) : setFacingMode("user")
  };

  const reset = () => {
    setPhoto("");
  };
  const gotoSearch = () => {
    setPhoto("");
    history.push("/search");
  };

  useEffect(() => {
    if (!photoTips) {
      Toast.fire({
        title: "<strong>Tips para la foto perfecta</strong>",
        icon: "info",
        html:
          '<img src="https://www.hogarmania.com/archivos/201105/killi-nothobranchius-rachovii-xl-668x400x80xX.jpg"/> ' +
          "Encuadra bien el pez en la foto ",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "ok",
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("photoTips", false);
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

  return (
    <>
      {!photo ? (
        <section className="camera">
          <Webcam
            className="camera-webcam"
            audio={false}
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            screenshotQuality={1}
          />
          <div className="camera-close">
            <button className="camera-close-icon" onClick={() => close()}> {/* Boton para activar la lógica de close */}
              <CloseIcon className="camera-close-icon__icon" />
            </button>
          </div>
          <div className="camera-switch">
            <button className="camera-switch-icon" >
              <FlipCameraIosOutlinedIcon sx={{ fontSize: 30 }} className="camera-close-icon__icon" onClick={() => switchCamera()} />
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
        </section>
      ) : (
        <>
          {fishName ? (
            <section className="camera">
              <div className="camera-fishname">
                <Link to="/details">
                  <button className="camera-fishname-button">{fishName}</button>
                  <ArrowForwardIosIcon className="camera-fishname-button__icon" />
                </Link>
                <div className="camera-fishname-img">
                  <img src={`assets/Details/${fishNameImg}.jpg`} alt="fish_photo" />
                </div>
              </div>
              <div className="camera-result">
                <img className="camera-result-img" src={photo} alt="cam_capture" />
              </div>
              <div className="camera-close">
                <button className="camera-close-icon" onClick={() => close()}>
                  <CloseIcon className="camera-close-icon__icon" />
                </button>
              </div>
              <div className="camera-refresh">
                <button className="camera-refresh-icon" onClick={() => reset()}>
                  <RefreshIcon className="camera-refresh-icon__icon" />
                </button>
              </div>
            </section>
          ) : (
            <section className="camera">
            <div className="camera-no-identify">
              <h1>No identificado</h1>
              <button onClick={() => reset()}>Volver a tomar foto</button>
              <button onClick={() => gotoSearch()}>Buscar por nombre</button>
            </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Camera;