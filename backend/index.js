const db = require('./db');
const express = require('express');

const app=express()
const port=5000

//using middlewere
app.use(express.json())




//Avaliable Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))



app.listen(port,()=>{
    console.log(`Example app listening at http://localhost: ${port}`)
})