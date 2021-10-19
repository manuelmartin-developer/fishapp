//Dependencies 
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

//******************************************** */

const mongoDb  = require('./routes/fishes_router');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))




//database connection
require('./utils/mongoDb');

// Directorios archivos staticos
app.use(express.static(__dirname + '/public'));

//Llamada a puerto
const port = 5000; 

app.listen(port, () => {
    console.log(`Servidor corriendo`)
})


app.use('/api', mongoDb);