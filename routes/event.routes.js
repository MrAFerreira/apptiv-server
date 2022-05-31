const router = require("express").Router();
const mongoose = require("mongoose");
//importing the Event model
const Event = require("./models/Event");

const fileUploader = require("../config/cloudinary.config");

router.get("/events", (req, res, next) => {
  Event.find({})
  .then((allEvents) => {
    res.status(200).json(allEvents);
  })
  .catch((err) => res.status(400).json({ message: "No events were found" }))
});

router.get("/events/:eventId", (req, res, next) => {
  const { eventId } = req.params;
  Event.findById(eventId)
    .then((response) => res.json(response))
    .catch(() => res.status(405).json({ message: "Invalid Input" }));
});

module.exports = router;
