import React, { useState, useEffect } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import Login from "../../components/Login/Login"; 
import HeaderLogo from "../HeaderLogo/HeaderLogo";


import Form from "../Form/Form";

import { app } from "../../firebase";

import "./Aquarium.scss"



function Aquarium() {

  const { isAuthenticated } = useAuth0(); 
  
  const [ aquarium, setNewAquarium ] = useState(false)

  const [show, setShow] = useState(false); 
  const [files, setFiles] = useState([]);
  const [viewForm, setviewForm] = useState(false) 
  const email = localStorage.getItem("email");

  const start = () => {
    setNewAquarium(true)
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
  
    <section >

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

      <div className="gallery">
          {files.map((file, index) => ( /* Pinta los datos de la data base, almacenados denteo del estado files. */
            <div className="gallery-element" key={index}>
              <div className="container-image">
                <img className="style-img" src={file.url} alt="" /> 
                <h3>{file.name}</h3>
              </div>
            </div>
          ))}
          <div className="add-full-container">
            <div className="add-container">
              <img src="assets/Form/peceraNaranja.png" />
                <button onClick={() => {showForm()}}>AÑADIR OTRO</button>
            </div>
          </div>
      </div>

    ) : (
      <Form />
    )

  }

    </div>
   
    </section>
  )
}

export default Aquarium;







