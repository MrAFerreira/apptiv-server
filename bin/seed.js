const mongoose = require("mongoose");
const User = require("../models/User.model");
const Event = require("../models/Event.model");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://OPERATORS:1234ironhack@cluster0.oeckanp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then((x) => console.log("Connected to the database"))
  .catch((err) => errorMessage("Error connecting to the database", err));

const users = [
  {
    username: "devOpsTeam",
    password: "12345",
    email: "devopsteam@a.com",
    goals: 2,
  },
  {
    username: "testing",
    passowrd: "testing",
    email: "testing@testing.com",
    goals: 3,
  },
];

const events = [
  {
    title: "hackathon",
    description: "Coding with my colleagues, TAs & LT",
    location: {
      address: "Ironhack",
      geo: {
        lat: 12.58,
        lng: -55.39,
      },
    },
    category: ["Dance, Brunch, Health & Wellbeing"],
    price: "34,99€",
    startDate: 2022 - 12 - 1,
    endDate: 2022 - 8 - 1,
  },

  {
    title: "hackathon 2",
    description: "Could be a relaxing day",
    location: {
      address: "Ironhack",
      geo: {
        lat: -57.71,
        lng: 109.47,
      },
    },
    category: ["Sports", "Social", "Travel"],
    price: "19,99€",
    startDate: 2023 - 1 - 15,
    endDate: 2023 - 1 - 31,
  },
];

User.create(users).then((userCreated) => {
  console.log(`Created ${userCreated.length} in the db`);
  mongoose.disconnect(() => console.log("Disconnected from the db"));
});

Event.create(events).then((eventCreated) => {
  console.log(`Created ${eventCreated.length} in the db`);
  mongoose.disconnect(() => console.log("Disconnected from the db"));
});
