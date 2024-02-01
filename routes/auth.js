const express = require("express");
const router = express.Router();
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const User = require("../models/user.model");

//apis
router.post("/register", async (req, res) => {
  //valid check
  //error handling
  //check if user exists
  //save to db
  try {
    //destructure
    const { name, email, mobile, password } = req.body;

    // Validation status code when
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ errorMessage: "Bad Request" });
    }

    // Check if user already exists api request  await 
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    //hash password  salt value 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userResponse = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Generate JWT token 
    const token = await jwt.sign(
      { userId: userResponse._id },
      process.env.JWT_SECRET
    );

    console.log(`User created: ${userResponse._id}`);

    res.json({
      message: "User registered successfully",
      token: token,
      user: {
        id: userResponse._id,
        name: name,
        email: email,
        mobile: mobile,
      },
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Bad Request! Invalid Credentials" });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong Password" });
    }
    const token = jwt.sign({ userId: userDetails._id }, process.env.JWT_SECRET);

    // console.log(`User created: ${userResponse._id}`);
    res.json({
      message: "User Logged In successfully",
      token: token,
      name: userDetails.name,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;



