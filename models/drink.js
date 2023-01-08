const {Schema, model} = require('mongoose')

const drinkSchema = new Schema({
    name: String,
    readyToDrink: Boolean,
    color: String
}, {
    timestamps:true
})

const Drink = model('Drink', drinkSchema)

module.exports = Drink