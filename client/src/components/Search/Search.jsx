import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Search = () => {


  const fishes = [
    { title: 'Guppy' },
    { title: 'Molly' },
    { title: 'Tetra' },
  
  ];

  return (
    <div className="search">
      <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={fishes.map((option) => option.title)}
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
  );
};


export default Search;
