const Coffee = require('../../models/coffee')

const dataController = {
  // Index,
  index (req, res, next) {
    Coffee.find({ }, (err, foundCoffees) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.coffees = foundCoffees
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Coffee.findByIdAndDelete(req.params.id, (err, deletedCoffee) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.coffee = deletedCoffee
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    req.body.readyToDrink = req.body.readyToDrink === 'on'
    Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCoffee) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.coffee = updatedCoffee
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    req.body.readyToDrink = req.body.readyToDrink === 'on'
    Coffee.create(req.body, (err, createdCoffee) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.coffee = createdCoffee
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Coffee.findById(req.params.id, (err, foundCoffee) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a coffee with that ID'
        })
      } else {
        res.locals.data.coffee = foundCoffee
        next()
      }
    })
  }
}

const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.coffees)
    },
    show (req, res, next) {
      res.json(res.locals.data.coffee)
    }
  }

module.exports = { dataController, apiController }