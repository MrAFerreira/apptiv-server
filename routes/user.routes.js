const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');
const User = require('../models/User.model');

router.get('/user/:username/friends', (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .populate('friends')
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => res.status(400).json({ message: 'Friends not found!' }));
});

router.get('/user/:username', (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .populate('attending')
    .then((userFromDB) => res.status(200).json(userFromDB))
    .catch((err) => res.status(400).json({ message: 'User not found!!' }));
});

router.put('/user/:userId', fileUploader.single('userImage'), (req, res, next) => {
  const { userId } = req.params;
  const { username, email, favourites, attending } = req.body;
  if (req.file) {
    User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        favourites,
        image: req.file.path,
        $push: { favourites: attending },
      },
      { new: true }
    )

      .then((response) => res.json(response))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: 'No user updated' });
      });
  } else {
    User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        favourites,
        $push: { attending: attending },
      },
      { new: true }
    )

      .then((response) => res.json(response))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: 'No user updated' });
      });
  }
});

router.delete('/user/:userId/delete', (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndRemove(userId)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: 'Invalid username supplied' }));
});

module.exports = router;
