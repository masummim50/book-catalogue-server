
const dotenv = require('dotenv').config()


module.exports.config = {
    database_url : process.env.DATABASE_URL,
    jwt_secret_key: process.env.JWT_SECRET_KEY
}
