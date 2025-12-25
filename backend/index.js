const db = require('./db');
const express = require('express');
var cors = require('cors');



const app=express()
const port=5000

//using middlewere
app.use(cors())
app.use(express.json())




//Avaliable Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))



app.listen(port,()=>{
    // console.log(`iNotebook backend listening at http://localhost: ${port}`)
    console.log(`iNotebook backend listening at http://localhost:${port}`);

})


// app.listen(5000, "0.0.0.0", () => {
//   console.log("Backend running on port 5000");
// });
// app.listen(5000, "0.0.0.0", () => {
//   console.log("Backend running on port 5000");
// });
