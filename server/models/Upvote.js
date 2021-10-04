const { Schema, model } = require('mongoose');

const upvoteSchema = new Schema(
    {
        username: {
            type: String,
            required: 'upvote must have an originating user.'
        }
    }
);

const Upvote = model('Upvote', upvoteSchema);

module.exports = Upvote;