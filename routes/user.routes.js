const router = require("express").Router();
const User = require("../models/User.model");

const User = require("../models/User.model");

router
  .get("/user/:userId/friends", (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
      .populate("friends")
      .then((foundUser) => {
        res.status(200).json(foundUser);
      });
  })
  .catch((err) => res.status(400).json({ message: "Friends not found!" }));

router
  .get("/user/:userId", (req, res, next) => {
    const { userId } = req.body;
    User.findById({ userId }).then((userFromDB) =>
      res.status(200).json(userFromDB)
    );
  })
  .catch((err) => res.status(400).json({ message: "User not found!!" }));

router.put("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password, image, favourites } = req.body;
  User.create({ username, email, password, image, favourites })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ message: "No user updated" }));
});

module.exports = router;
