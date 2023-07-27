const express = require('express');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const app = express();
const bodyParser = require('body-parser');
const { Routes } = require('./routes');
const cors = require('cors');
const AuthRoutes = require('./modules/auth/auth.route');
const BookRoutes = require('./modules/book/book.route');

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/v1', BookRoutes)
app.use('/api/v1', AuthRoutes); 


app.use(globalErrorHandler)

module.exports = app;