const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    user: { // Each ticket is gonna be connected to a user
      type: mongoose.Schema.Types.ObjectId, // To relate this field to the users object id - coz each ticket is gonna be connected to a user
      required: true,
      ref: 'User',  // To have a refference to the User schema -> That mongoose knows that it is the ObjectId of the User collection 
    },
    product: {  // Each Ticket is associated with a specific product
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],  // For these products a ticket can be submitted - to have a short list of products one can chose from
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: { // Status of the ticket
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,   // created at / updated at
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)   // To export the model - It's imported in ticketController.js - Ticket is the name of the model and ticketSchema is the object
