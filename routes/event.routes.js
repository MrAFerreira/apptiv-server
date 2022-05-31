const router = require('express').Router();

const Event = require('../models/Event.model.js');

router.get('/events', (req, res, next) => {
  res.status(200).json('Should send all the events');
});

router.delete('/events/:eventId', (req, res, next) => {
  const { eventId } = req.params;

  Event.findByIdAndRemove(eventId)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: 'Error Message' }));
});

router.get('/events/:eventId', (req, res, next) => {
  const { eventId } = req.params;
  Event.findById(eventId)
    .then((response) => res.json(response))
    .catch((err) => res.status(405).json({ message: 'Invalid Input' }));
});

module.exports = router;
