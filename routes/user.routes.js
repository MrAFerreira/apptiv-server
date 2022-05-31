const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
router.get("/user/:userId", (req, res, next) => {
  res.status(200).json("Should get the specific user info");
});

router.delete("/user/:userId/Delete", (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndRemove(userId)
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(400).json({ message: "Invalid username supplied" })
    );
});

module.exports = router;
