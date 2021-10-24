import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import CameraIcon from "@mui/icons-material/Camera";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Toast } from "../../hooks/useToast";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from "../../contexts/photoContext";
import axios from "axios";

const Camera = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { fishName, setFishName } = useContext(fishContext);
  const { photo, setPhoto } = useContext(photoContext);
  const photoTips = localStorage.getItem("photoTips");

  const videoConstraints = {
    width: 896,
    height: 896,
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

    setFishName("guppy")

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
      }
    });
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

  console.log(fishName)
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
                <Link to="/details">
                  <button>Ir a detalles</button>
                </Link>
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
              <button onClick={() => reset()}>Volver a tomar foto</button>
              <button onClick={() => gotoSearch()}>Buscar por nombre</button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Camera;
