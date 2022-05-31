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
    title,
    description,
    location,
    category,
    price,
    startDate,
    endDate,
    image,
    attendees,
  } = req.body;

  //handle optional fields:
  if (endDate) {
    endDate = endDate;
  } else {
    endDate = null;
  }
  if (image) {
    image = image;
  } else {
    image = "";
  }

  Event.create({
    title,
    description,
    location,
    category,
    price,
    startDate,
    endDate,
    image,
    attendees,
  })
    .then((eventCreated) => {
      //console.log(allEvents);
      res.status(200).json(eventCreated);
    })
    .catch((err) =>
      res.status(400).json({ message: "Issue when creating the event" })
    );
});

module.exports = router;
