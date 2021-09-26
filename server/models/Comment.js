const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: 'comment must have text.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: 'comment must have an originating user.'
        },
        upvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Upvote'
            }
        ]
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;