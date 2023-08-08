const express = require("express");
const BookController = require("./book.controller");
const { checkAuth } = require("../../middlewares/authCheck");

const BookRoutes = express.Router();

BookRoutes.post("/book", checkAuth, BookController.createBook);
BookRoutes.get("/books", BookController.getAllBooks);
BookRoutes.get("/books/recent", BookController.getRecentBooks)
BookRoutes.get("/books/years", BookController.getYears)
BookRoutes.patch(
  "/book/wishlist/:id",
  checkAuth,
  BookController.addBookToWishlist
  );
  BookRoutes.patch(
    "/book/reading/:id",
    checkAuth,
    BookController.addBookToReadingList
    );
BookRoutes.patch("/book/wishlist/remove/:id", checkAuth, BookController.removeBookFromWishlist);
BookRoutes.patch("/book/readingList/remove/:id", checkAuth, BookController.removeBookFromReadingLIst);
BookRoutes.delete("/book/:id", checkAuth, BookController.deleteBookById);
BookRoutes.patch("/book/:id", checkAuth, BookController.editBookById);
BookRoutes.get("/book/:id", BookController.getBookById);
BookRoutes.post("/book/review/:id", checkAuth, BookController.addReview)
BookRoutes.patch("/book/review/:id", checkAuth, BookController.editReview)
BookRoutes.delete("/book/review/:id", checkAuth, BookController.deleteReview)

module.exports = BookRoutes;
