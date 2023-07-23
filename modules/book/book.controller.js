
const ApiError = require('../../errors/apiError');
const userModel = require('../user/user.model');
const sendResponse = require('./../../shared/sendResponse');
const { bookModel } = require('./book.model');


const getAllBooks = async(req, res, next)=> {
    try {
        const books = await bookModel.find({});
        sendResponse(res, 200, "New book Added Successfully", books)
    } catch (error) {
        next(error)
    }
}

const createBook = async(req, res, next)=> {
    try {
        const bookInfo = req.body;
        const bookObj = {...bookInfo, addedBy:req.user._id};
        const newBook = await bookModel.create(bookObj);
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
        const book = await bookModel.findOneAndDelete({_id:bookId, addedBy: req.user._id}, {new:true});
        if(book){
            sendResponse(res, 200, "Book Deleted Successfully", book)
        }else{
            throw new ApiError(400, "book does not exist or you are not authorize to delete this book")
        }
        
    } catch (error) {
        next(error)
    }
}

const editBookById = async(req, res, next)=> {
    try {
        const bookId = req.params.id;
        const update = req.body;
        const book = await bookModel.findOneAndUpdate({_id:bookId, addedBy:req.user._id}, update, {new:true});
        
        if(book){
            sendResponse(res, 200, "Book updated Successfully", book)
        }else{
            throw new ApiError(400, "book does not exist or you are not authorize to update this book")
        }
    } catch (error) {
        next(error)
    }
}

const addBookToWishlist = async (req, res, next)=> {
    try {
        const bookId = req.params.id;
        const updatedUser = await userModel.updateOne({_id:req.user._id}, {$push: {wishlist: bookId}});
        if(updatedUser){
            sendResponse(res, 200, "Book Added to Wishlist Successfully")
        }else{
            throw new ApiError(400, "something went wrong adding the book to wishlist")
        }
    } catch (error) {
        next(error)
    }
}
const addBookToReadingList = async (req, res, next)=> {
    try {
        const bookId = req.params.id;
        const updatedUser = await userModel.updateOne({_id:req.user._id}, {$push: {reading: bookId}});
        if(updatedUser){
            sendResponse(res, 200, "Book Added to Reading List Successfully")
        }else{
            throw new ApiError(400, "something went wrong adding the book to Reading List")
        }
    } catch (error) {
        next(error)
    }
}
const BookController = {
  createBook,
  getBookById,
  deleteBookById,
  editBookById,
  addBookToWishlist,
  addBookToReadingList,
  getAllBooks
}

module.exports= BookController;