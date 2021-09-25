const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema(
    {
        public: {
            type: Boolean,
            required: 'Recipe must be either public or private.'
        },
        creator: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        recipeTitle: {
            type: String,
            required: 'Recipe must have a title.',
            trim: true,
            minLength: 5,
            maxlength: 30,
            unique: false
        },
        recipeDescription: {
            type: String
        },
        // type as in breakfast, lunch, dinner etc.
        type: {
            type: String,
            minLength: 5,
            maxLength: 35
        },
        // season for christmas, thanksgiving etc.
        season: {
            type: String,
            minLength: 3,
            maxLength: 15
        },
        difficulty: {
            type: Number,
        },
        servings: {
            type: Number,
        },
        cookTime: {
            type: Number
        },
        steps: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Step'
            }
        ],
        ingredients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ingredient'
            }
        ],
        cookware: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Cookware'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        // upvotes: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'User'
        //     }
        // ],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);



const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;