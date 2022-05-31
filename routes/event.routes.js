const router = require('express').Router();
const fileUploader = require("../config/cloudinary.config");

router.get('/events', (req, res, next) => {
  res.status(200).json('Should send all the events');
});

module.exports = router;
