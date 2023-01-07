const {Schema, model} = require('mongoose')

const coffeeSchema = new Schema({
    name: String,
    readyToDrink: Boolean,
    color: String
}, {
    timestamps:true
})

const Coffee = model('Coffee', coffeeSchema)

module.exports = Coffee