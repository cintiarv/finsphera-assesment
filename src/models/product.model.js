import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  price: {
    type: String,
  },
  buyer:{
    type:String
  },
  seller:{
    type:String
  }
})

export const Product = model('Products', productSchema)
