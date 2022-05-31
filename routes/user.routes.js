const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');
const User = require('../models/User.model');

router.get('/user/:userId', (req, res, next) => {
  res.status(200).json('Should get the specific user info');
});

router
  .get('/user/:userId', (req, res, next) => {
    const { userId } = req.body;
    User.findById({ userId }).then((userFromDB) => res.status(200).json(userFromDB));
  })
  .catch((err) => res.status(400).json({ message: 'User not found!!' }));

router.put('/user/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password, image, favourites } = req.body;
  User.create({ username, email, password, image, favourites })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: 'No user updated' }));
});

router.delete('/user/:userId/delete', (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndRemove(userId)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: 'Invalid username supplied' }));
});

module.exports = router;
