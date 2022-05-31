const router = require('express').Router();

const User = require('../models/User.model')

router.get('/user/:userId/friends', (req, res, next) => {
  User.findById((userId))
  .populate("friends")
  .then((foundUser) => {
    res.status(200).json(foundUser)
  })
  .catch((err) => res.status(400).json({message: "Friends not found!"}))
  
});

module.exports = router;
