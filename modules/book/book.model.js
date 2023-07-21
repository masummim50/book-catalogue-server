import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String, required:true}, 
  author: {type: String, required:true},
  genre: {type: String, required:true},
  date: { type: Date, required:true },
  reviews: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      review: { type: String, required: true },
    }
  ],
},{
    timestamps:true
});


export const bookModel = mongoose.model('Book', bookSchema)