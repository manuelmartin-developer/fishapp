import React, { useEffect, useContext, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from "axios";

const Search = () => {

  const [fishName, setFishName ] = useState("");
  const [fishesNames, setFisheshName] = useState([]);
  const [details, setDetails] = useState([]);

  const handleInputChange = (event, value) => {
      
    for (let fish of fishesNames){
      
      if(fish.nombre === value){
        setFishName(value)
        break;
      }else{
        setFishName("");
      }
    }

  }

  useEffect(() => {

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/names",
          options
        );
        
        setFisheshName(response.data);
      } catch (error) {
        console.log(error);
      }
    })();

    if(fishName){
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
    }

    
  }, [fishName]);
  

  return (
    <>
    <div className="search">
      <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onInputChange={handleInputChange}
          options={fishesNames.map((option) => option.nombre)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Busca un pez"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        </Stack>
    </div>
     {fishName ?
    <div className="details">
         <p>{details.nombre}</p>     
         <p>{details.latin}</p>     
    </div>
    :
    <div className="details">
         
    </div>
     }         
    </>
  );
};


export default Search;
