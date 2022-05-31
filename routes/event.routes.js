const router = require("express").Router();
const Event = require("../models/Event.model");

router.get("/events", (req, res, next) => {
  res.status(200).json("Should send all the events");
});

let filteredEvents;

router.post("/events/filter", (req, res, next) => {
  const { categories, date, location, price } = req.body;
  Event.find({})
    .then((allEvents) => {
      filteredEvents = allEvents.filter((event) => {
        return (
          categories === event.categories ||
          date === event.date ||
          location === event.location ||
          price === event.price
        );
      });
      res.status(200);
    })
    .catch((err) => res.status(400).json({ message: "Event not found" }));
});

router.get("/events/filter", (req, res, next) => {
  if (filteredEvents.length < 1) {
    res.status(400).json({ message: "Event not found" });
  }

  res.status(200).json(filteredEvents);
});

module.exports = router;
