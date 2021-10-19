const mongoose = require('mongoose');
mongoose.connect(process.env.URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => console.log('connection to db established'));

module.exports = mongoose; 