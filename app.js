//Dependencies 

const api_fishes = require('./routes/pg_fishDetails_routes')
require('./utils/dbpg');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
var helmet = require('helmet');
const path = require('path');

//******************************************** */


const app = express();

const corsOptions = {
    origin: [
        "https://localhost:5000",
        "https://localhost:3001",
        "https://server-fishapp.herokuapp.com"
    ]
};

// Middleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'build')));


//Helmet
app.use(helmet());
app.disable('x-powered-by');


// Directorios archivos staticos
app.use(express.static(__dirname + '/public'));


//Routing 

app.use('/api', api_fishes);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


//Llamada a puerto

app.listen((process.env.PORT || 5000), () => {
    console.log(`Servidor corriendo`)
})