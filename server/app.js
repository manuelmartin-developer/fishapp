//Dependencies 
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
var helmet = require('helmet');

//******************************************** */

const mongoDb  = require('./routes/fishes_router');
const dbpg = require('./routes/fishes_router')

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))


// Middleware
app.use(morgan('dev'));


//Helmet
app.use(helmet());
app.disable('x-powered-by');


//database connection
require('./utils/mongoDb');
require('./utils/dbpg'); 


// Directorios archivos staticos
app.use(express.static(__dirname + '/public'));


//Routing 
app.use('/api', mongoDb);
/* app.use('/api', dbpg ) */


//Llamada a puerto
const port = 5000; 
app.listen(port, () => {
    console.log(`Servidor corriendo`)
})