const router = require("express").Router();
const mongoose = require("mongoose");
//importing the Event model
const Event = require("./models/Event");

router.put("/events/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    category,
    price,
    startDate,
    enDate,
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

  Event.findByIdAndUpdate(
    id,
    {
      title,
      description,
      location,
      category,
      price,
      startDate,
      endDate,
      image,
      attendees,
    },
    { new: true }
  )
    .then((modifiedEvent) => {
      res.status(200).json(modifiedEvent);
      return modifiedEvent;
    })
    .catch((err) => {
      if (id === undefined) {
        res.status(400).json({ message: "Invalid ID supplied" });
      } else if (!modifiedEvent) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.status(405).json({ message: "Validation exception" });
      }
    });
});

module.exports = router;
