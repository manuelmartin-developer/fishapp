import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Spinner = () => {
  const [progress, setProgress] = useState(10);

  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);
  

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ minWidth: 35, textAlign:"center" }}>
          <Typography sx={{color: "#1CB0A1", fontSize:20}} variant="body2" >{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ width: '100%', display:"flex", justifyContent:"center"}}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default Spinner;
