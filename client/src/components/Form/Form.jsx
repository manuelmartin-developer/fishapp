import React, { useState, useEffect } from "react";
import { storage } from '../../firebase'; 
import { app } from '../../firebase'

const Form = () => {


  const [fileUrl, setFileUrl] = useState(""); 
  const [files, setFiles] = useState([]); 

  const handleChange = async (e) => {

    const file =  e.target.files[0];
    const storageRef = app.storage().ref(); 
    const filePath = storageRef.child(file.name);
    await filePath.put(file); 

    console.log("archivo cargado", file.name)

    //Para guardar la url en la base de datos 
    const urlLink = await filePath.getDownloadURL(); 
    setFileUrl(urlLink); 
  }; 

  const handleSubmit = async (e) => {

    e.preventDefault(); 
    const fileName = e.target.name.value;
    const refCollection = app.firestore().collection("images"); //llamada  la base de datos. 
    const docFile = await refCollection.doc(fileName).set({name: fileName, url: fileUrl}); 

  }; 


  useEffect(async () => {
    const filesList = await app.firestore().collection("images").get();  //Firebase nos da un objeto
    setFiles(filesList.docs.map((doc) => doc.data())); 
  }, [])


  return (
<>
  <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange}/>
        <input type="text" name="name"placeholder="nombre" />
        <button>Upload</button>
  </form>
  <ul>
        {files.map((file) => <li><h3>{file.name}</h3><img src={file.url} height="300px" width="300px" alt="" /></li>)}
  </ul>
</>

  )};

export default Form