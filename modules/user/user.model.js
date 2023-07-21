import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type: String, required:true}, 
  password: {type: String, required:true},
  name: {type: String, required:true},
}, {
    timestamps:true
});


export const userModel = mongoose.model('User', bookSchema)