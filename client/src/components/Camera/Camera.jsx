import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import CameraIcon from '@mui/icons-material/Camera';
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';

const Camera = () => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState("");
  const [identified, setIdentified] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoConstraints = {
    width: 360,
    height: 560,
    facingMode: "user",
    // Cambiar en producción para activar la cámara trasera
    // facingMode: { exact: "environment" },
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  
  };

  const refresh = () => {
    setPhoto('');
    setIdentified(false);
  }
  
  const accept = () => {
    
    console.log(photo);
    setIdentified(true);
      // Enviar photo a endpoint
    /**
     * response ok:
     * setIdentified(true)
     * response error:
     * Volver a tomar foto o buscar por nombre
     */
  }

  return (
    <>
      {!photo ? (
        <section className="camera">
          <Webcam
            audio={false}
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={"100%"}
            videoConstraints={videoConstraints}
            screenshotQuality={1}
          />
          <IconButton
            sx={{ color: "white", display: "flex", position: "relative", top: -75}}
            onClick={capture}
            olor="primary"
            aria-label="take picture"
            component="span"
          >
            <CameraIcon sx={{fontSize:"3.5rem"}} />
          </IconButton>
        </section>
      ) : (
        <section className="camera">
          <img src={photo} alt="cam_capture" />
          <IconButton
            sx={{ color: "white", position: "relative", top: -550, left:20}}
            onClick={refresh}
            olor="primary"
            aria-label="reload picture"
            component="span"
          >
            <RefreshIcon sx={{fontSize:"4rem"}}  />
          </IconButton>
          <IconButton
            sx={{ color: "white", position: "relative", top: -550, left:180}}
            onClick={accept}
            olor="primary"
            aria-label="reload picture"
            component="span"
          >
            <CheckIcon sx={{fontSize:"4rem"}}  />
          </IconButton>
        </section>
      )}
    </>
  );
};

export default Camera;
