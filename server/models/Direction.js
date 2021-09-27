const { Schema, model } = require('mongoose');

const directionSchema = new Schema(
    {
        stepText: {
            type: String,
            required: 'step must have a name.',
            trim: true,
        },
        id: {
            type: String,
            required: 'step must have a direction order id'
        },
        directionsOrder: [
            {
                type: String
            }
        ]
    }
);

const Direction = model('Direction', directionSchema);

module.exports = Direction;