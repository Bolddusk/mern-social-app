const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Generate salt & Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    // Save user & return response
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {

    if(!req.body.password || !req.body.email)
      res.status(400).json("Email or Password is missing.")

    //Check if users's email exists
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    // Check if password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
    
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong!");
  }

});

module.exports = router;
