const express = require("express");
const BookController = require("./book.controller");
const { checkAuth } = require("../../middlewares/authCheck");

const BookRoutes = express.Router();

BookRoutes.post("/book", checkAuth, BookController.createBook);
BookRoutes.get("/books", BookController.getAllBooks);
BookRoutes.post(
  "/book/wishlist/:id",
  checkAuth,
  BookController.addBookToWishlist
);
BookRoutes.post(
    "/book/reading/:id",
    checkAuth,
    BookController.addBookToReadingList
  );
BookRoutes.delete("/book/:id", checkAuth, BookController.deleteBookById);
BookRoutes.patch("/book/:id", checkAuth, BookController.editBookById);
BookRoutes.get("/book/:id", BookController.getBookById);
BookRoutes.post("/book/review/:id", checkAuth, BookController.addReview)
BookRoutes.patch("/book/review/:id", checkAuth, BookController.editReview)

module.exports = BookRoutes;
