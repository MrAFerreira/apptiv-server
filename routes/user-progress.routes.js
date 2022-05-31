const router = require("express").Router();
const User = require("../models/User.model");

function getWeek(date) {
  let oneJan = new Date(date.getFullYear(), 0, 1);
  let numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

router.get("/user/:userId/progress", (req, res, next) => {
  const { userId } = req.params;

  let currentWeek = getWeek(new Date());

  function eventsThisWeek() {
    User.findById(userId)
      .populate("attending")
      .then((response) => {
        return response.attending.filter(
          (e) => getWeek(e.startDate) === currentWeek
        );
      });
  }

  function passedEvents() {
    eventsThisWeek().filter((e) => e.startDate < new Date());
  }

  User.findById(userId)
    .populate("attending")
    .then((response) => {
      let result = Math.round((100 * passedEvents()) / response.goals);
      if (result <= 100) {
        res.json({ result, goals: response.goals });
      }
    })
    .catch((err) => res.json(err));
});
