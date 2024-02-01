const express = require('express');
const dotenv =require('dotenv')
var cors = require('cors')
const connectDB = require('./config/db.js');
const app =express();
dotenv.config();

connectDB();

//middlewares used globally 
app.use(cors());
app.use(express.json()); // enabling the parsing of JSON data for all routes.


// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'UP', message: 'Server is up and running' });
  });

//login
//register
//edit
//post 
//get details
//home


PORT = process.env.PORT || 8000;
app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})