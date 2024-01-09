const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//Register user
router.post('/register', async (req, res) => {

  //generate salt and secured password
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  const user = await new User({
    username: req.body.username,
    email: req.body.email,
    password: secPass,
  })

  try {
    //check if email or username already exists
    let usercheck = await User.findOne({ email: req.body.email });
    if (usercheck) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    // let usercheck2 = await User.findOne({ username: req.body.username });
    // if (usercheck2) {
    //   return res.status(400).json({ error: "Sorry a user with this name already exists" })
    // } 

    //Then save user 
    await user.save()
    res.status(200).json(user)

  }
  catch(error) {
    res.status(500).json({message:error.message})
  }
})

//Login route
router.post('/login', async (req, res) => {

  try{
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json('User Not found')
  }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      return res.json('Invalid Credentials')
    }
  
  res.status(200).json(user)
  }catch(error){
    res.status(500).json('Internal Server Error')
    console.log(error)
  }
})
module.exports = router