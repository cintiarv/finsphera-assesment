import { Seller } from '../models/seller.model.js'
import bcrypt from '../libs/bcrypt.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (data) {
  const { email } = data
  const sellerFound = await Seller.findOne({ email })
  if (sellerFound) {
    throw new StatusHttp('This author already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  return await Author.create({ ...newAuthor, password: encryptedPassword })
}

function getAll () {
  return Seller.find()
}

function getById (id) {
  return Seller.findById(id)
}
function getUserProducts (idUser) {
  return  Seller.find({
    id: { $eq: idUser }
  })

}

function deleteById (id) {
  return Seller.findByIdAndDelete(id)
}
function updateById (id, data) {
  return Seller.findByIdAndUpdate(id, data, { new: true })
}

export {
  create,
  getAll,
  getUserProducts,
  getById,
  deleteById,
  updateById,
}
