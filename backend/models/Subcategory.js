// models/Subcategory.js
const mongoose = require('mongoose')

const SubcategorySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	// alte câmpuri dacă ai nevoie
})

module.exports = mongoose.model('Subcategory', SubcategorySchema)
