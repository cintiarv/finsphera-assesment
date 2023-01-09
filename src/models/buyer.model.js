import { Schema, model } from 'mongoose'

const buyerSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'This email is not valid'
    ]
  },
  paymentType: {
    type:String,
    required: true
  },
  soldProducts:[ {
    type: String
  }]
})

export const Buyer = model('Buyers', buyerSchema)
