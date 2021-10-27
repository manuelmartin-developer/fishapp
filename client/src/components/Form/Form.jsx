import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { useForm } from "react-hook-form";
import { app } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import Header from '../Header/Header'
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
/* import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; */

import "./Form.scss"

const Form = () => {

  const history = useHistory(); 
  const { register, watch, formState: { errors } } = useForm();
  const [fileUrl, setFileUrl] = useState("");
  const [files, setFiles] = useState([]);

  const [viewForm, setviewForm] = useState(false) //Para visualizar la parte del formulario para añadir. 

  const email = localStorage.getItem("email");

  console.log(files)

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
      .set({email: email,
            name: fileName, 
            age: fileAge,
            adopt: fileAdop,
            url: fileUrl,
            });
    history.push('/')
    
  };

  useEffect(async () => {
    const filesList = await app
      .firestore()
      .collection("images")
      .where("email", "==", email)
      .get(); //Firebase nos da un objeto
    setFiles(filesList.docs.map((doc) => doc.data()));
  }, []);


  const showForm = () => {
    setviewForm(true)
  }

  return (

    <section className="form">

    <div className="form-image">
      <img src="" alt="" />
    </div>
      
    <div className="form-container">    
      <form className="form-form" onSubmit={handleSubmit}>
          <p className="form-title">Añadir pez a mi acuario</p>
          <Stack spacing={2} sx={{ width: 280 }}>
          <TextField   className="form-input"id="outlined-basic" label="nombre del pez" variant="outlined" placeholder="nombre" {...register("name", { required: true, minlenght: 3 } )} className="input-value" type="text" name="name" required  />
          <TextField  className="form-input"id="outlined-basic" label="edad del pez" variant="outlined" placeholder="edad" {...register("age", { required: true, minlenght: 3 } )} className="input-value" type="age" name="age" required  />
          <TextField  className="form-input"id="date" type="date"  {...register("adopt", { required: true, minlenght: 3 } )} className="input-value" name="adopt" required   />
          </Stack>
          <input className="form-input-add"id="outlined-basic" variant="outlined" type="file" onChange={handleChange}  />
          <button className="form-buttonSave">GUARDAR</button>
          <button className="form-buttonAdd">AÑADIR OTRO</button>
      </form>
    </div>



    </section>
  );
  
};

export default Form;







