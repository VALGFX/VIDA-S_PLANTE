import express from 'express'
const router = express.Router()

// Exemplu simplu de endpoint GET pentru lista subcategorii
router.get('/', (req, res) => {
  res.json({
    success: true,
    subcategories: [
      { id: 1, name: 'Subcategorie 1' },
      { id: 2, name: 'Subcategorie 2' },
      { id: 3, name: 'Subcategorie 3' },
    ],
  })
})

// Poți adăuga aici și alte rute (POST, PUT, DELETE) pentru subcategorii

export default router
