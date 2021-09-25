const { Schema, model } = require('mongoose');

const cookwareSchema = new Schema(
    {
        cookwareName: {
            type: String,
            required: 'cookware must have a name.',
            trim: true,
            unique: false
        }
    }
);

const Cookware = model('Cookware', cookwareSchema);

module.exports = Cookware;