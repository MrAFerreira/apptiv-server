const router = require("express").Router();
const User = require("../models/User.model");

router
  .get("/user/:userId", (req, res, next) => {
    const { userId } = req.body;
    User.findById({ userId }).then((userFromDB) =>
      res.status(200).json(userFromDB)
    );
  })
  .catch((err) => res.status(400).json({ message: "User not found!!" }));

module.exports = router;
