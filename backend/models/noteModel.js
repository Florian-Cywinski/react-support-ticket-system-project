const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    user: {   // To know which user applies to that note
      type: mongoose.Schema.Types.ObjectId, // To relate this field to the users object id - coz each note is gonna be connected to a user
      required: true,
      ref: 'User',  // To have a refference to the User schema -> That mongoose knows that it is the ObjectId of the User collection
    },
    ticket: { // To know which ticket applies to that note
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',  // To have a refference to the Ticket schema -> That mongoose knows that it is the ObjectId of the Ticket collection
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    isStaff: {  // A note can be either from a user or the stuff
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
