const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
router.get("/events", (req, res, next) => {
  res.status(200).json("Should send all the events");
});

router.get("/events/eventId", (req, res, next) => {
  const { eventId } = req.params;
  Event.findById(eventId)
    .then((response) => res.json(response))
    .catch((err) => res.status(405).json({ message: "Invalid Input" }));
});

module.exports = router;
