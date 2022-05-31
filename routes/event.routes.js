const router = require('express').Router();

const mongoose = require('mongoose');
//importing the Event model
const Event = require('../models/Event.model');
const fileUploader = require('../config/cloudinary.config');

router.put('/events/:id', fileUploader.single('eventImage'), (req, res, next) => {
  const { id } = req.params;
  let { title, description, location, category, price, startDate, endDate } = req.body;

  //handle optional fields:
  if (endDate) {
    endDate = endDate;
  } else {
    endDate = null;
  }
  let eventToUpdate;

  let image;
  if (req.file) {
    eventToUpdate = {
      title,
      description,
      location,
      category,
      price,
      startDate,
      endDate,
      image: req.file.path,
    };
  } else {
    eventToUpdate = { title, description, location, category, price, startDate, endDate };
  }

  Event.findByIdAndUpdate(id, eventToUpdate, { new: true })
    .then((modifiedEvent) => {
      res.status(200).json(modifiedEvent);
      return modifiedEvent;
    })
    .catch((err) => {
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid ID supplied' });
      } else if (!modifiedEvent) {
        res.status(404).json({ message: 'Event not found' });
      } else {
        res.status(405).json({ message: 'Validation exception' });
      }
    });
});

router.get('/events', (req, res, next) => {
  Event.find({})
    .then((allEvents) => {
      //console.log(allEvents);
      res.status(200).json(allEvents);
    })
    .catch((err) => res.status(400).json({ message: 'No events were found' }));
});

//create the post route:
router.post('/events', fileUploader.single('eventImage'), (req, res, next) => {
  let { title, description, location, category, price, startDate, endDate } = req.body;

  //handle optional fields:
  if (endDate) {
    endDate = endDate;
  } else {
    endDate = null;
  }
  let eventToCreate;

  let image;
  if (req.file) {
    eventToCreate = {
      title,
      description,
      location,
      category,
      price,
      startDate,
      endDate,
      image: req.file.path,
    };
  } else {
    eventToCreate = { title, description, location, category, price, startDate, endDate };
  }

  Event.create(eventToCreate)
    .then((eventCreated) => {
      //console.log(allEvents);
      res.status(200).json(eventCreated);
    })
    .catch((err) => res.status(400).json({ message: 'Issue when creating the event' }));
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
    .populate('attendees')
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(405).json({ message: 'Invalid input' }));
});

module.exports = router;
