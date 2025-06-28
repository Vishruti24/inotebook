const express = require('express');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = "Vishruti vish";

//Route:1  Create a user using: POST "/api/auth/createuser"
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password with at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: "A user with this email already exists" });
    }
    //use becrypt for secure password
    const password = String(req.body.password);
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    // Create new user
      user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    //jwt Token......
    const data ={
        user:{
            id:user.id
        }
    }
   const authToken =  jwt.sign(data,JWT_SECRET);
   //console.log(authToken);
   success=true;
    res.status(200).json(success,authToken);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});


//Route:2 Authenticate a User using: POST:"/api/auth/login"
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', "can't be blank").exists(),
], async (req, res) => {
  let success=false;
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}= req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"user doesn't exists"});
    }
    const passComp = await bcrypt.compare(password,user.password);
    if(!passComp){
         success=false;
        return res.status(400).json({success,error:"user doesn't exists"});
    }
    //jwt Token......
    const data ={
        user:{
            id:user.id
        }
    }
   const authToken =  jwt.sign(data,JWT_SECRET);
   //console.log(authToken);
   success=true;
    res.status(200).json({success,authToken});
  } catch (error) {
     console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});


//Route:3 get details of loged in users POST "/api/auth/getuser"..Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

