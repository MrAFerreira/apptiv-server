const router = require("express").Router();
const User = require("../models/User.model");

router.get("/user/:userId", (req, res, next) => {
  res.status(200).json("Should get the specific user info");
});

router.put("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password, image, favourites } = req.body;
  User.create({ username, email, password, image, favourites })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: "No user updated" }));
});

module.exports = router;
