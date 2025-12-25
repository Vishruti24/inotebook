const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
//const mongoURL = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDBCompass&directConnection=true&ssl=false" //replace mydatabase with yours name
//const mongoURL = "mongodb+srv://Vishruti:vishrutimd24@cluster0.tjhbmnc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//const mongoURL=process.env.DB_url;
//const mongoURL=process.env.Atlas_URL;
const mongoURL = "mongodb://mongo:27017/inotebook";
//const mongoURL="mongodb://inotebook-mongo:27017/inotebook"
//setup MongoDB connection
mongoose.connect(mongoURL,
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

//get default connection
//mongoose maintains a default connection object representing mongodb connection
const db = mongoose.connection;

//default event listener for database connection
db.on('connected', () => {
    console.log('Connected to Mongodb server..');
});
db.on('error', (err) => {
    console.log('Mongodb connection error..',err);
});
db.on('disconnected', () => {
    console.log('Mongodb disconnected..');
});

//export the database connection
module.exports = db;  



