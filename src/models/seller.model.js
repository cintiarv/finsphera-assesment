import { Schema, model } from 'mongoose'

const sellerSchema = new Schema({
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
  password: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  productsToBuy:[ {
    type:String
  }]
})

export const Seller = model('Sellers', sellerSchema)
