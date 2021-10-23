import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { app } from "../../firebase";

const Form = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [files, setFiles] = useState([]);
  const email = localStorage.getItem("email");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const filePath = storageRef.child(file.name);
    await filePath.put(file);

    console.log("archivo cargado", file.name);

    //Para guardar la url en la base de datos
    const urlLink = await filePath.getDownloadURL();
    setFileUrl(urlLink);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    const fileName = e.target.name.value;
    const fileAge = e.target.age.value; 
    const fileAdop = e.target.adopt.value; 
    const refCollection = app.firestore().collection("images"); //llamada  la base de datos.
    const docFile = await refCollection
      .doc(fileName)
      .set({name: fileName,
            age: fileAge,
            adopt: fileAdop,
            url: fileUrl,
            });
  };

  useEffect(async () => {
    const filesList = await app
      .firestore()
      .collection("images")
      .where("email", "==", email)
      .get(); //Firebase nos da un objeto
    setFiles(filesList.docs.map((doc) => doc.data()));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}> {/* Recoge los datos a través de este formulario */}
        <input type="file" onChange={handleChange} />
        <input type="text" name="name" placeholder="nombre" />
        <input type="number" name="age" placeholder="edad" />
        <input type="date" name="adopt" placeholder="fecha adopción"/>
        <button>Upload</button>
      </form>
      <div className="gallery">
          {files.map((file, index) => ( /* Pinta los datos de la data base, almacenados denteo del estado files. */
            <div className="gallery-element" key={index}>
              <h3>{file.name}</h3>
              <img src={file.url} height="200px" alt="" />
            </div>
          ))}
      </div>
    </>
  );
};

export default Form;
