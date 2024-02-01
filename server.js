const express = require('express');
const dotenv =require('dotenv')
var cors = require('cors')
const app =express();
dotenv.config();
PORT = process.env.PORT || 8000;

//middlewares used globally 
app.use(cors());
app.use(express.json()); // enabling the parsing of JSON data for all routes.







app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})