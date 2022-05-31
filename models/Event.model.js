const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
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
    },
    price: Number,
    startDate: Date,
    endDate: Date,
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Event', eventSchema);
