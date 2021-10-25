import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { useForm } from "react-hook-form";
import { app } from "../../firebase";
import { Link, useHistory } from "react-router-dom";


const FamilyBook = (files) => {
  return <div>
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
                <Link to="/form">
                  <button>AÑADIR OTRO</button>
                </Link>
            </div>
          </div>
          
      </div>
  </div>;
};

export default FamilyBook;
