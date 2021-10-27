import React, { useContext, useEffect } from "react";
import { fishContext } from "../../contexts/fishContext";
import { photoContext } from "../../contexts/photoContext";
import { Mixin, Toast } from "../../hooks/useToast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { app } from "../../firebase";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Details = () => {
  const { fishName, setFishName } = useContext(fishContext);
  const { photo, setPhoto } = useContext(photoContext);
  const { details, setDetails } = useContext(fishContext);
  const email = localStorage.getItem("email");
  const history = useHistory();
  const fishNameImg = fishName.toLowerCase().replace(/ /g, "");

  const addMyAquarium = async () => {
    if (email) {
      const refCollection = app.firestore().collection("images");
      const docFile = await refCollection
        .doc()
        .set({ email: email, url: photo });
      Mixin.fire({
        position: "center",
        title: "El pez ha sido agregado a Mi Acuario",
      });
      setPhoto("");
    } else {
      Toast.fire({
        title: "Mi Acuario",
        text: "Para guardar fotos debes estar loggeado",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/profile");
          setPhoto("");
          setFishName("");
          setDetails("");
        }
      });
    }
  };

  const close = () => {
    setPhoto("");
    setFishName("");
    setDetails("");
    history.push("/camera");
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
  }, []);

  return (
    <section className="details">
      <div className="camera-close">
        <button className="camera-close-icon" onClick={() => close()}>
          <ArrowBackIcon className="camera-close-icon__icon" />
        </button>
      </div>
      <div className="details-fishname">
        {fishName}
        <img
          className="details-hearth"
          src="assets/Details/hearth.svg"
          alt="hearth_icon"
        />
      </div>
      <div className="details-photo">
        <img src={`assets/Details/${fishNameImg}.jpg`} alt="fish_photo" />
      </div>
      <div className="details-thumbs">
        <div className="details-thumbs-macho">
          <img
            className="details-thumbs-macho"
            src={`assets/Details/${fishNameImg}_macho.jpg`}
            alt="fish_photo"
          />
          <p className="details-thumbs-macho-text">Macho</p>
        </div>
        <div className="details-thumbs-hembra">
          <img
            className="details-thumbs-hembra"
            src={`assets/Details/${fishNameImg}_hembra.jpg`}
            alt="fish_photo"
          />
          <p className="details-thumbs-hembra-text">Hembra</p>
        </div>
      </div>
      <div className="details-title">
        <img src="assets/Details/oval.png" alt="oval_icon" />
        <h2>Características</h2>
      </div>
      <div className="details-description">
        <p className="details-description-bold">Nombre:</p>
        <p>
          {details.nombre} - <em>{details.latin}</em>
        </p>
        <p className="details-description-bold">Hábitat:</p>
        <p>{details.habitat}</p>
        <p className="details-description-bold">Cardumen:</p>
        <p>{details.cardumen}</p>
        <p className="details-description-bold">Morfología hembra:</p>
        <p>{details.hembra}</p>
        <p className="details-description-bold">Morfología macho:</p>
        <p>{details.macho}</p>
        <p className="details-description-bold">Especies compatibles:</p>
        <p>{details.compatibilidad_con}</p>
        <p className="details-description-bold">Especies incompatibles:</p>
        <p>{details.compatibilidad_sin}</p>
      </div>
      <div className="details-title">
        <img src="assets/Details/oval.png" alt="oval_icon" />
        <h2>Datos especie</h2>
      </div>
      <div className="details-scroll">
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-vertical">
            <img id="img-ph" src="assets/Details/PH.png" alt="" />
            <img id="img-agua" src="assets/Details/agua.png" alt="" />
          </div>
          <p className="details-scroll-data-images-title">PH AGUA</p>
          <p className="details-scroll-data-images-text">{details.ph}</p>
        </div>
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-horizontal">
            <img id="img-meter" src="assets/Details/meter.png" alt="" />
            <img id="img-fish" src="assets/Details/fish.png" alt="" />
          </div>
          <p className="details-scroll-data-images-title">TAMAÑO</p>
          <p className="details-scroll-data-images-text">{details.tamano}</p>
        </div>
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-horizontal">
            <img id="img-life" src="assets/Details/life.png" alt="" />
          </div>
          <p className="details-scroll-data-images-title">AÑOS DE VIDA</p>
          <p className="details-scroll-data-images-text">{details.vida}</p>
        </div>
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-horizontal">
            <img id="img-dureza" src="assets/Details/dureza.png" alt="" />
          </div>
          <p className="details-scroll-data-images-title">DUREZA</p>
          <p className="details-scroll-data-images-text">{details.dureza}</p>
        </div>
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-horizontal">
            <img
              id="img-temperatura"
              src="assets/Details/temperature.png"
              alt=""
            />
          </div>
          <p className="details-scroll-data-images-title">TEMPERATURA</p>
          <p className="details-scroll-data-images-text">
            {details.temperatura}
          </p>
        </div>
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-horizontal">
            <img id="img-espacio" src="assets/Details/espacio.png" alt="" />
          </div>
          <p className="details-scroll-data-images-title">ESPACIO</p>
          <p className="details-scroll-data-images-text">{details.espacio}</p>
        </div>
        <div className="details-scroll-data">
          <div className="details-scroll-data-images-horizontal">
            <img
              id="img-temperamento"
              src="assets/Details/temperamento.png"
              alt="img"
            />
          </div>
          <p className="details-scroll-data-images-title">TEMPERAMENTO</p>
          <p className="details-scroll-data-images-text">
            {details.temperamento}
          </p>
        </div>
      </div>
      <div className="details-title">
        <img src="assets/Details/oval.png" alt="oval_icon" />
        <h2>Descripción</h2>
      </div>
      <div className="details-description">
        <p className="details-description-bold">Comida:</p>
        <p>{details.comida}</p>
        <p className="details-description-bold">Necesidades:</p>
        <p>{details.necesidades}</p>
        <p className="details-description-bold">Especies incompatibles:</p>
        <p>{details.descripcion}</p>
      </div>
      <button
        className="details-button"
        onClick={() => {
          addMyAquarium();
        }}
      >
        AÑADIR A MI ACUARIO
      </button>
    </section>
  );
};
export default Details;
