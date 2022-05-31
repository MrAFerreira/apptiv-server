const router = require("express").Router();
const mongoose = require("mongoose");
//importing the Event model
const Event = require("./models/Event");

router.get("/events", (req, res, next) => {
  Event.find({})
    .then((allEvents) => {
      //console.log(allEvents);
      res.status(200).json(allEvents);
    })
    .catch((err) => res.status(400).json({ message: "No events were found" }));
});

//create the post route:
router.post("/events", (req, res, next) => {
  const {
    id,
    title,
    description,
    location,
    category,
    price,
    startDate,
    enDate,
    image,
    attendees,
  } = req.body;

  Event.create()
    .then((eventCreated) => {
      //console.log(allEvents);
      res.status(200).json(eventCreated);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
