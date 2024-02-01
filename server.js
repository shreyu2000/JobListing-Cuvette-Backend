const express = require('express');
const dotenv =require('dotenv')
var cors = require('cors')
const connectDB = require('./config/db.js');
const app =express();
dotenv.config();
PORT = process.env.PORT || 8000;

connectDB();

//middlewares used globally 
app.use(cors());
app.use(express.json()); // enabling the parsing of JSON data for all routes.

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'UP', message: 'Server is up and running' });
  });


app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})