const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    // Reference arrays -
    // groceryList: [
    //     {
    //         type: Schema.types.ObjectId,
    //         ref: 'Ingredient'
    //     }
    // ],
    // savedRecipes: [
    //     {
    //         type: Schema.types.ObjectId,
    //         ref: 'Recipe'
    //     }
    // ],
    // comments: [
    //     {
    //         type: Schema.types.ObjectId
    //     }
    // ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;