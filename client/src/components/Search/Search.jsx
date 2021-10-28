import React, { useEffect, useContext, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { fishContext } from "../../contexts/fishContext";

const Search = () => {

  const {fishName, setFishName } = useContext(fishContext);
  const [fishesNames, setFisheshName] = useState([]);
  const { details, setDetails } = useContext(fishContext);
  const history = useHistory();

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

  }, [fishName, setDetails]);
  

  return (
    <>
    <div className="search">
      <Stack className="search-stack" spacing={2} sx={{ width: 344}}>
      <Autocomplete  
          freeSolo
          sx={{paddingLeft: 4, display:"flex", alignItems:"center"}}
          id="free-solo-2-demo"
          disableClearable
          onInputChange={handleInputChange}
          options={fishesNames.map((option) => option.nombre)}
          renderInput={(params) => (
            <TextField
            sx={{display:"flex", alignItems:"center"}}
              {...params}
              label="Buscar pez"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        </Stack>
    </div>        
    </>
  );
};


export default Search;
