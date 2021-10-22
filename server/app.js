//Dependencies 

const api_fishes = require('./routes/pg_fishDetails_routes')
require('./utils/dbpg');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
var helmet = require('helmet');

//******************************************** */


const app = express();

const corsOptions = {
    origin: [
        "https://localhost:5000",
        "https://localhost:3001",
    ]
};

// Middleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


//Helmet
app.use(helmet());
app.disable('x-powered-by');


// Directorios archivos staticos
app.use(express.static(__dirname + '/public'));


//Routing 

app.use('/api', api_fishes);


//Llamada a puerto
const port = 5000;
app.listen(port, () => {
    console.log(`Servidor corriendo`)
})