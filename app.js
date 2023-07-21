const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Routes } = require('./routes');
const cors = require('cors');
const AuthRoutes = require('./modules/auth/auth.route');

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/v1', AuthRoutes); 

module.exports = app;