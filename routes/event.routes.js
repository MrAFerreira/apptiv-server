const router = require("express").Router();

router.get("/events", (req, res, next) => {
  res.status(200).json("Should send all the events");
});

router.get("/events/eventId", (req, res, next) => {
  const { eventId } = req.params;
  Event.findById(eventId)
    .populate("attendees")
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(405).json({ message: "Invalid input" }));
});
module.exports = router;
