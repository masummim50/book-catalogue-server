const ApiError = require("../../errors/apiError");
const userModel = require("../user/user.model");
const sendResponse = require("./../../shared/sendResponse");
const { bookModel } = require("./book.model");

const getAllBooks = async (req, res, next) => {
  console.log("getting all books");
  try {
    const books = await bookModel.find({}).populate({
      path: "addedBy",
      select: "name",
    });
    sendResponse(res, 200, "New book Added Successfully", books);
  } catch (error) {
    next(error);
  }
};

const getRecentBooks = async (req, res, next) => {
  console.log("getting recent books");
  try {
    const books = await bookModel.find({}).sort({createdAt:-1}).limit(20).populate({
      path: "addedBy",
      select: "name",
    });
    sendResponse(res, 200, "New book Added Successfully", books);
  } catch (error) {
    next(error);
  }
};

const getSearchedBooks = async(req, res, next)=> {
  try {
    const searchtext = req.params.searchtext;
    console.log(searchtext);
    const searchWords = searchtext.split(/\s+/); // Split search text into individual words
  const regexArray = searchWords.map(word => new RegExp(`\\b${word}\\b`, 'i')); // Create an array of case-insensitive regexes

  const result = await bookModel.aggregate([
    {
      $match: {
        $or: [
          { title: { $in: regexArray } },
          { author: { $in: regexArray } },
          { genre: { $in: regexArray } }
        ]
      }
    }
  ]);
  console.log(result);
  sendResponse(res, 200, "Searched Books retrieved Successfully", result);

  } catch (error) {
    next(error)
  }
}


const getYears = async(req, res, next)=> {
  try {
    const uniqueYears = await bookModel.aggregate([
      {
        $project: {
          _id: 0, // Exclude the default _id field from the output
          year: { $year: '$date' }, // Extract the year part from the date field
        },
      },
      {
        $group: {
          _id: '$year', // Group by the extracted year
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field from the output
          year: '$_id', // Rename the _id field as 'year' in the output
        },
      },
    ]).sort("1");

    sendResponse(res, 200, "years", uniqueYears)
  } catch (error) {
    // Handle the error
    console.error('Error while fetching unique years:', error);
    throw error;
  }
}

const createBook = async (req, res, next) => {
  try {
    const bookInfo = req.body;
    const bookObj = { ...bookInfo, addedBy: req.user._id };
    const newBook = await bookModel.create(bookObj);
    sendResponse(res, 200, "New book Added Successfully", newBook);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel
      .findById(bookId)
      .populate({ path: "addedBy", select: "name" })
      .populate({ path: "reviews.user", select: "name" });
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    sendResponse(res, 200, "Book Retrieved Successfully", book);
  } catch (error) {
    next(error);
  }
};
const deleteBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel.findOneAndDelete(
      { _id: bookId, addedBy: req.user._id },
      { new: true }
    );
    if (book) {
      sendResponse(res, 200, "Book Deleted Successfully", book);
    } else {
      throw new ApiError(
        400,
        "book does not exist or you are not authorize to delete this book"
      );
    }
  } catch (error) {
    next(error);
  }
};

const editBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const update = req.body;
    const book = await bookModel.findOneAndUpdate(
      { _id: bookId, addedBy: req.user._id },
      update,
      { new: true }
    );

    if (book) {
      sendResponse(res, 200, "Book updated Successfully", book);
    } else {
      throw new ApiError(
        400,
        "book does not exist or you are not authorize to update this book"
      );
    }
  } catch (error) {
    next(error);
  }
};

const addBookToWishlist = async (req, res, next) => {
  
  console.log(req.params.id, "adding")
  try {
    const bookId = req.params.id;
    const updatedUser = await userModel.updateOne(
      { _id: req.user._id },
      { $push: { "wishlist": {_id: bookId} } }
    );
    if (updatedUser) {
      sendResponse(res, 200, "Book Added to Wishlist Successfully");
    } else {
      throw new ApiError(
        400,
        "something went wrong adding the book to wishlist"
      );
    }
  } catch (error) {
    next(error);
  }
};
const removeBookFromWishlist = async (req, res, next) => {
  
  console.log(req.params.id, "remove category")
  try {
    const bookId = req.params.id;
    const updatedUser = await userModel.updateOne(
      { _id: req.user._id },
      { $pull: { wishlist: {_id:bookId} } }
    );
    if (updatedUser) {
      sendResponse(res, 200, "Book Added to Wishlist Successfully");
    } else {
      throw new ApiError(
        400,
        "something went wrong adding the book to wishlist"
      );
    }
  } catch (error) {
    next(error);
  }
};
const removeBookFromReadingLIst = async (req, res, next) => {
  
  console.log(req.params.id, "remove category")
  try {
    const bookId = req.params.id;
    const updatedUser = await userModel.updateOne(
      { _id: req.user._id },
      { $pull: { reading: {_id:bookId} } }
    );
    if (updatedUser) {
      sendResponse(res, 200, "Book Added to Wishlist Successfully");
    } else {
      throw new ApiError(
        400,
        "something went wrong adding the book to wishlist"
      );
    }
  } catch (error) {
    next(error);
  }
};
const addBookToReadingList = async (req, res, next) => {
  console.log("reading list", req.params.id)
  try {
    const bookId = req.params.id;
    const updatedUser = await userModel.updateOne(
      { _id: req.user._id },
      { $push: { "reading": {_id:bookId} } }
    );
    if (updatedUser) {
      sendResponse(res, 200, "Book Added to Reading List Successfully");
    } else {
      throw new ApiError(
        400,
        "something went wrong adding the book to Reading List"
      );
    }
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    console.log("req body", req.body);
    const review = { user: req.user._id, ...req.body };
    console.log("review", review);
    const updateBookReview = await bookModel
      .findOneAndUpdate(
        { _id: bookId },
        { $push: { reviews: review } },
        { new: true }
      )
      .populate({ path: "reviews.user", select: "name" }).populate({path:"addedBy", select:"name"});
    if (updateBookReview) {
      sendResponse(res, 200, "Review Posted Successfully", updateBookReview);
    } else {
      throw new ApiError(400, "something went wrong to post Review");
    }
  } catch (error) {
    next(error);
  }
};

const editReview = async (req, res, next) => {
  try {
      const bookId = req.params.id;
      const review = { user: req.user._id, ...req.body };
      const updatedReviewData = { user: req.user._id, review: req.body.review }; 
    const updateBookReview = await bookModel
      .findOneAndUpdate(
        { _id: bookId, "reviews._id": req.body._id },
        { $set: { "reviews.$.user": updatedReviewData.user, "reviews.$.review": updatedReviewData.review } },
        { new: true }
      )
      .populate({ path: "reviews.user", select: "name" }).populate({path:"addedBy", select:"name"});
    if (updateBookReview) {
      sendResponse(res, 200, "Review updated Successfully", updateBookReview);
    } else {
      throw new ApiError(400, "something went wrong to post Review");
    }
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const reviewId = req.body._id;

    const updateBookReview = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $pull: { reviews: { _id: reviewId, user: req.user._id } } },
      { new: true }
    )
    .populate({ path: "reviews.user", select: "name" })
    .populate({ path: "addedBy", select: "name" });

    if (updateBookReview) {
      sendResponse(res, 200, "Review deleted Successfully", updateBookReview);
    } else {
      throw new ApiError(400, "Failed to delete Review");
    }
  } catch (error) {
    next(error);
  }
};

const BookController = {
  createBook,
  getBookById,
  deleteBookById,
  editBookById,
  addBookToWishlist,
  addBookToReadingList,
  getAllBooks,
  addReview,
  editReview,
  deleteReview,
  removeBookFromWishlist,
  removeBookFromReadingLIst,
  getRecentBooks,
  getYears,
  getSearchedBooks
};

module.exports = BookController;
