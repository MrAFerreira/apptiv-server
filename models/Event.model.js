const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  id: Number,
  titile: String,
  description: String,
  location: {
    address: [String],
    geo: {
      lat: Number,
      lng: Number,
    },
  },
  category: {
    type: String,
    enum: [
      "Sports",
      "Social",
      "Health & Wellbeing",
      "Travel",
      "Family",
      "Brunch",
      "Spirituality",
      "Dance",
      "Others",
    ],
    price: Number,
    startDate: String,
    endDate: String,
    image: String,
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});

module.exports = model("Event", eventSchema);
