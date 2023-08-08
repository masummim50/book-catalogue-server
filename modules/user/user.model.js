const mongoose = require('mongoose');
const bcryptFunctions = require('../../bcrypt/bcryptFunctions');
const { jwtFunctions } = require('../../jwt/jwtFunctions');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type: String, required:true, unique:true, index:true}, 
  password: {type: String, required:true},
  name: {type: String, required:true},
  books: [{
    _id: {type: mongoose.Types.ObjectId, ref:'Book', required:true},
  }
  ],
  wishlist: [{
    _id: {type: mongoose.Types.ObjectId, ref:'Book', required:true},
  }
  ],
  reading: [{
    _id: {type: mongoose.Types.ObjectId, ref:'Book', required:true},
  }
  ]
}, {
    timestamps:true
});

userSchema.pre('save', async function() {
  this.password = await bcryptFunctions.hashPassword(this.password);
})
const userModel = mongoose.model('User', userSchema)
module.exports = userModel;