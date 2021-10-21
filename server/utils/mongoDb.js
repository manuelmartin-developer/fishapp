const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fullsifhapp:1234fish@cluster0.boh9t.mongodb.net/FULLFISHAPP?authSource=admin&replicaSet=atlas-6hm7ti-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => console.log('connection to db established'));

module.exports = mongoose; 