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
      required:true,
    } ,
    email: {
      type: String,
      required:true
    },
   id : {
    type: integer, 
  },
  image: {
    type: String,
  },
  favourites: {
    type: [String],

  },
  goalsAttending: [{
    type: Schema.Types.ObjectId,
      ref: "Goals",
  }],
  createdEvents:[{
    type: Schema.Types.ObjectId,
    ref: "Events",
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "Friends",
  }],
    
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }

);

const User = model("User", userSchema);

module.exports = User;
