const { Schema, model } = require('mongoose');

const upvoteSchema = new Schema(
    {
        username: {
            type: String,
            required: 'upvote must have an originating user.',
            unique: true
        }
    }
);

const Upvote = model('Upvote', upvoteSchema);

module.exports = Upvote;