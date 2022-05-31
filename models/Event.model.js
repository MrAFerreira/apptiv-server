const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: String,
  description: String,
  location: {
    address: String,
    geo: {
      lat: Number,
      lng: Number,
    },
  },
  category: {
    type: [String],
    enum: [
      'Sports',
      'Social',
      'Health & Wellbeing',
      'Travel',
      'Family',
      'Brunch',
      'Spirituality',
      'Dance',
      'Others',
    ],
    price: Number,
    startDate: Date,
    endDate: Date,
    image: String,
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

module.exports = model('Event', eventSchema);
