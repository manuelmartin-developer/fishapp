import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import CameraIcon from "@mui/icons-material/Camera";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Toast } from "../../hooks/useToast";
import { fishContext } from '../../contexts/fishContext';
import { photoContext } from '../../contexts/photoContext';

const Camera = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {fishName, setFishName} = useContext(fishContext);
  const {photo, setPhoto} = useContext(photoContext);

  

  const videoConstraints = {
    width: 896,
    height: 896,
    facingMode: "user",
    // Cambiar en producción para activar la cámara trasera
    // facingMode: { exact: "environment" },
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({width: 224, height: 224});
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
      }
    });
  };
  const reset = () => {
    setPhoto("");
  }
  const gotoSearch = () =>{
    setPhoto("");
    history.push("/search");
  }

  
  useEffect(() => {
   
    
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
    <section className="camera">
      {!photo  ? (
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
              sx={{ color: "black" }}
              onClick={capture}
              aria-label="take picture"
              component="span"
            >
              <CameraIcon sx={{ fontSize: "3.5rem" }} />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          {fishName ? (
            <>
              <div className="camera-fishname">
                <h1>{fishName}</h1>
                <Link to="/details"><button>Ir a detalles</button></Link>
                <Link to="/details"><button>Añadir a mi acuario</button></Link>
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
              <button onClick={()=>gotoSearch()}>Buscar por nombre</button>
            </div>

          )}
        </>
      )}
    </section>
  );
};

export default Camera;
