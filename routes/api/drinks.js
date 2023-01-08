const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/drinks')

// add routes
// Index
router.get('/api', dataController.index, apiController.index)
// Delete /api/drinks/:id
router.delete('/api/:id', dataController.destroy, apiController.show)
// Update /api/drinks/:id
router.put('/api/:id', dataController.update, apiController.show)
// Create /api/drinks/:id
router.post('/api', dataController.create, apiController.show)
// Show/api/drinks/:id
router.get('/api/:id', dataController.show, apiController.show)


module.exports = router