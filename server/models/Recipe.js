const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
    {
        public: {
            type: Boolean,
            required: 'Recipe must be either public or private.'
        },
        username: {
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
            maxlength: 30
        },
        type: {
            type: String,
            required: 'Recipe must have a type.',
            minLength: 5,
            maxLength: 35
        },
        season: {
            type: String,
            required: 'Recipe must have a season.',
            minLength: 3,
            maxLength: 15
        },
        difficulty: {
            type: Number,
            required: 'Recipe must have a difficulty.'
        },
        servings: {
            type: Number,
            required: 'Recipe must have servings made.'
        },
        cookTime: {
            type: Number,
            required: 'Recipe must have estimated time.'
        },
        // steps: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Step'
        //     }
        // ],
        // ingredients: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Ingredient'
        //     }
        // ],
        // cookware: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Cookware'
        //     }
        // ],
        // comments: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Comment'
        //     }
        // ],
        // upvotes: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'User'
        //     }
        // ],
    }
);

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;