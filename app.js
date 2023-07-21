const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api', routes); // Assuming all API routes start with '/api'

module.exports = app;