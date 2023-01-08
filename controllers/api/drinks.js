const Drink = require('../../models/drink')

const dataController = {
  // Index,
  index (req, res, next) {
    Drink.find({ }, (err, foundDrinks) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.drinks = foundDrinks
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Drink.findByIdAndDelete(req.params.id, (err, deletedDrink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.drink = deletedDrink
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    req.body.readyToDrink = req.body.readyToDrink === 'on'
    Drink.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedDrink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.drink = updatedDrink
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    req.body.readyToDrink = req.body.readyToDrink === 'on'
    Drink.create(req.body, (err, createdDrink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.drink = createdDrink
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Drink.findById(req.params.id, (err, foundDrink) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a drink with that ID'
        })
      } else {
        res.locals.data.drink = foundDrink
        next()
      }
    })
  }
}

const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.drinks)
    },
    show (req, res, next) {
      res.json(res.locals.data.drink)
    }
  }

module.exports = { dataController, apiController }