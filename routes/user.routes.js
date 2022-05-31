const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

router.get("/user/:userId", (req, res, next) => {
  res.status(200).json("Should get the specific user info");
});

module.exports = router;
