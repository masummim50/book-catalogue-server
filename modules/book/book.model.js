const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String, required:true}, 
  author: {type: String, required:true},
  genre: {type: String, required:true},
  date: { type: Date, required:true },
  addedBy: {
    type:Schema.Types.ObjectId, ref:'User', required:true
  },
  reviews: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      review: { type: String, required: true },
    }
  ],
},{
    timestamps:true
});


module.exports.bookModel = mongoose.model('Book', bookSchema)