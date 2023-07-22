
import { bookModel } from './book.model';
const sendResponse = require('./../../shared/sendResponse');

const createBook = async(req, res, next)=> {
    try {
        const bookInfo = req.body;
        const newBook = await bookModel.create(bookInfo);
        sendResponse(res, 200, "New book Added Successfully", newBook)
    } catch (error) {
        next(error)
    }
}

const getBookById = async(req, res, next)=> {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        sendResponse(res, 200, "Book Retrieved Successfully", book)
    } catch (error) {
        next(error)
    }
}
const deleteBookById = async(req, res, next)=> {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findByIdAndDelete(bookId);
        sendResponse(res, 200, "Book Deleted Successfully", book)
    } catch (error) {
        next(error)
    }
}

const editBookById = async(req, res, next)=> {
    try {
        const bookId = req.params.id;
        const update = req.body;
        const book = await bookModel.findByIdAndUpdate(bookId, update, {new:true});
        sendResponse(res, 200, "Book updated Successfully", book)
    } catch (error) {
        next(error)
    }
}


const BookController = {
  createBook,
  getBookById,
  deleteBookById,
  editBookById
}

module.exports= BookController;
