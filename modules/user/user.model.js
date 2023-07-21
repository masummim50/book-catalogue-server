import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type: String, required:true}, 
  password: {type: String, required:true},
  name: {type: String, required:true},
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


export const userModel = mongoose.model('User', bookSchema)