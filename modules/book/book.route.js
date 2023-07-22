

const express =require('express');
const BookController = require('./book.controller');

const BookRoutes = express.Router();

BookRoutes.post("/book", BookController.createBook)

module.exports= BookRoutes;