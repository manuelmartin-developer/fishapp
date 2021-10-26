import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Form from "../Form/Form";
import { app } from "../../firebase";
import Nav from "../Nav";
import { useHistory } from "react-router-dom";
import "./Aquarium.scss"





function Aquarium() {

  const history = useHistory()

  const [ aquarium, setNewAquarium ] = useState(false)

  const [show, setShow] = useState(false); 
  const [files, setFiles] = useState([]);
  const [viewForm, setviewForm] = useState(false) 
  const email = localStorage.getItem("email");

  const start = () => {
    setNewAquarium(true)
    history.push("/profile")
  }
  const showForm = () => {
    setviewForm(true)
  }

  useEffect(() => {
    if(email) {

      (async () => {
        const filesList =  
          await app
          .firestore()
          .collection("images")
          .where("email", "==", email)
          .get(); //Firebase nos da un objeto  
          setFiles(filesList.docs.map((doc) => doc.data()));
      })()
    }
  }, [email]);

  console.log(files)

 
  return (
  
    <section className>
    <HeaderLogo/>
    <div className="aquarium">

    {files.length === 0 ? (
      <>
      <div className="aquarium-conta">
          <img src="assets/Aquarium/Pecera.png" height="160px" alt="" className="pecera"/>
          <div className="aquarium-class">
            <p>Aún no has agregado peces a tu acuario</p>
          </div>
          <div className="aquarium-text">
            <p>¡Saca una foto a tu pez y que empiece la aventura!</p>
          </div>
          <button onClick={()=> {start()}} className="aquarium-buttonAdd">AÑADIR PEZ A MI ACUARIO</button>
      </div>
      </>

    ) : !viewForm ? (
      <div className="aquarium-viewForm">
        <div className="aquarium-title">
          <p>Mi acuario</p>
        </div>
      <div className="aquarium-gallery">
          {files.map((file, index) => ( /* Pinta los datos de la data base, almacenados denteo del estado files. */
            <div className="aquarium-gallery-image" key={index}>
                <img className="aquarium-gallery-image-detail" src={file.url} alt="" /> 
                <h3>{file.name}</h3>
            </div>
          ))}
          <div className="aquarium-containerButton">
            <div className="aquarium-addButton">
              <img src="assets/Form/peceraNaranja.png" />
                <button onClick={() => {showForm()}}>AÑADIR OTRO</button>
            </div>
          </div>
      </div>
      </div>
    ) : (
      <Form />
    )

  }

    </div>
    <Nav/>
    </section>
  )
}

export default Aquarium;







