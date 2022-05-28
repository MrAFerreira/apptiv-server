const router = require('express').Router();

router.get('/events', (req, res, next) => {
  res.status(200).json('Should send all the events');
});

module.exports = router;
