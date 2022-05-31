const router = require("express").Router();
const User = require("../models/User.model");
const Event = require("../models/Event.model.js");

function getWeek(date) {
  let oneJan = new Date(date.getFullYear(), 0, 1);
  let numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  console.log(
    `The week number of the current date (${new Date()}) is ${result}.`
  );
}
let currentWeek = getWeek(new Date());

function allEvents() {
  User.attending.filter((e) => getWeek(e.startDate) === currentWeek);
  /*  Math.round((100 * data.attending) / data.goals); */
}

function eventThisWeek() {
  allEvents().filter((e) => e.startDate < new Date());
}

router.get("/user/:userId/progress", (req, res, next) => {
  const { userId } = req.params;

  User.findById({ userId })
    .populate("goals")
    .populate("attending")
    .then((response) => {
      let result = Math.round((100 * eventThisWeek()) / response.goals);
      if (result <= 100) {
        res.json(result);
      }
    })
    .catch((err) => res.json(err));
});
