require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Item = require('../models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Caffeine', sortOrder: 10},
    {name: 'Alcohol', sortOrder: 20},
    {name: 'Drinks', sortOrder: 30},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Coffee', emoji: '☕', category: categories[0], price: 5.95}, 
    {name: 'Tea', emoji: '🍵', category: categories[0], price: 3.95},
    {name: 'Champagne', emoji: '🥂', category: categories[1], price: 8.95},
    {name: 'Bottle Champagne', emoji: '🍾', category: categories[1], price: 100.00},
    {name: 'Beer', emoji: '🍺', category: categories[1], price: 3.95},
    {name: 'Wine', emoji: '🍷', category: categories[1], price: 9.95},
    {name: 'Milk', emoji: '🥛', category: categories[2], price: 1.00},
    {name: 'Juice', emoji: '🍹', category: categories[2], price: 3.95},
  ]);

  console.log(items)

  process.exit();

})();
