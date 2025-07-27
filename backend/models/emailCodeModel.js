import mongoose from 'mongoose'

const emailCodeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expiră în 5 min
})

export default mongoose.model('EmailCode', emailCodeSchema)
