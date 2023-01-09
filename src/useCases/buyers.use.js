import { Buyer } from '../models/buyer.model.js'
import bcrypt from '../libs/bcrypt.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (data) {
  const { email } = data
  const buyerFound = await Buyer.findOne({ email })
  if (buyerFound) {
    throw new StatusHttp('This author already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  return await Author.create({ ...newAuthor, password: encryptedPassword })
}

function getAll () {
  return Buyer.find()
}

function getById (id) {
  return Buyer.findById(id)
}

function deleteById (id) {
  return Buyer.findByIdAndDelete(id)
}
function updateById (id, data) {
  return Buyer.findByIdAndUpdate(id, data, { new: true })
}

export {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
}
