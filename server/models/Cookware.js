const { Schema, model } = require('mongoose');

const cookwareSchema = new Schema(
    {
        cookwareName: {
            type: String,
            required: 'cookware must have a name.'
        }
    }
);

const Cookware = model('Cookware', cookwareSchema);

module.exports = Cookware;