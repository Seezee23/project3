const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/coffees')

// add routes
// Index
router.get('/api', dataController.index, apiController.index)
// Delete /api/coffees/:id
router.delete('/api/:id', dataController.destroy, apiController.show)
// Update /api/coffees/:id
router.put('/api/:id', dataController.update, apiController.show)
// Create /api/coffees/:id
router.post('/api', dataController.create, apiController.show)
// Show/api/coffees/:id
router.get('/api/:id', dataController.show, apiController.show)


module.exports = router