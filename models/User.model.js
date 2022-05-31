const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  },
  favourites: {
    type: [String],
  },
  goals: { type: Number },
  attending: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;
