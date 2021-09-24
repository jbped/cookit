const { Schema, model } = require('mongoose');

const stepSchema = new Schema(
    {
        stepText: {
            type: String,
            required: 'step must have a name.',
            trim: true,
        },
        stepNumber: {
            type: Number,
            required: 'step must have a number'
        }
    }
);

const Step = model('Step', stepSchema);

module.exports = Step;