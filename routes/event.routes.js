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

module.exports = router;
