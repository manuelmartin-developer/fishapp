import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import CameraIcon from "@mui/icons-material/Camera";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { Toast } from "../../hooks/useToast";
import { fishContext } from '../../contexts/fishContext';

const Camera = () => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState("");
  const [identified, setIdentified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {fishName, setFishName} = useContext(fishContext);
  const history = useHistory();


  const videoConstraints = {
    width: 360,
    height: 600,
    facingMode: "user",
    // Cambiar en producción para activar la cámara trasera
    // facingMode: { exact: "environment" },
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc); 
    setIdentified(true); 
  };

  const close = () => {
    Toast.fire({
      icon: "info",
      title: "Deseas salir sin guardar?",
    }).then((result) => {
      if (result.isConfirmed) {
        setPhoto("");
        // setIdentified(false);
      }
    });
  };
  const reset = () => {
    setPhoto("");
  }

  useEffect(() => {
    console.log(photo);
    
    // Enviar photo a endpoint
    /**
     * response ok:
     * setIdentified(true)
     * response error:
     * Volver a tomar foto o buscar por nombre
     */
  }, [photo, identified]);

  return (
    <section className="camera">
      {!photo ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={"100%"}
            videoConstraints={videoConstraints}
            screenshotQuality={1}
          />
          <div className="camera-capture-icon">
            <IconButton
              sx={{ color: "white" }}
              onClick={capture}
              olor="primary"
              aria-label="take picture"
              component="span"
            >
              <CameraIcon sx={{ fontSize: "3.5rem" }} />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          {identified ? (
            <>
              <div className="camera-fishname">
                <h1>{fishName}</h1>
                <Link to="/details"><button>Ir a detalles</button></Link>
                
              </div>
              <div className="camera-capture">
                <img src={photo} alt="cam_capture" />
              </div>
              <div className="camera-close-icon">
                <IconButton
                  sx={{ color: "black", display: "flex", position: "relative" }}
                  onClick={close}
                  aria-label="reload picture"
                  component="span"
                >
                  <CloseIcon sx={{ fontSize: "4rem" }} />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="camera-no-identify">

              <h1>No identificado</h1>
              <button onClick={()=>reset()}>Volver a tomar foto</button>
              <Link to="/search"><button >Buscar por nombre</button></Link>
            </div>

          )}
        </>
      )}
    </section>
  );
};

export default Camera;
