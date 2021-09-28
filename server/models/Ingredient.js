const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema(
    {
        ingredientName: {
            type: String,
            required: 'Ingredient must have a name.',
            trim: true,
        },
        measurement: {
            type: String,
        },
        quantity: {
            type: Number,
            required: 'Ingredient must have a quantity.',
            // validate: /^([0-9/])+$/
        },
        preparationNotes: {
            type: String,
        },
        ingredientId: {
            type: String,
            required: 'Ingredient must have an order id'
        }
    }
);

const Ingredient = model('Ingredient', ingredientSchema);

module.exports = Ingredient;