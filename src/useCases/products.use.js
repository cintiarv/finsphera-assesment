import { Product } from '../models/product.model.js'
import bcrypt from '../libs/bcrypt.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (data) {
  const { email } = data
  const productFound = await Product.findOne({ email })
  if (productFound) {
    throw new StatusHttp('This author already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  return await Author.create({ ...newAuthor, password: encryptedPassword })
}

function getAll () {
  return Product.find()
}

function getUserProducts (args) {
      return Product.find({
        buyer: { $eq: args.id }
      })   
}

function getUserProducts2 (args) {
  return Product.find({
    seller: { $nin: args.id }
  })   
}

function getById (id) {
  return Product.findById(id)
}

function deleteById (id) {
  return Product.findByIdAndDelete(id)
}
function updateById (id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true })
}

export {
  create,
  getAll,
  getUserProducts,
  getUserProducts2,
  getById,
  deleteById,
  updateById,
}
