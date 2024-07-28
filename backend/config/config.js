require('dotenv').config();
const config = {
    DB_URL: process.env.DATABASE_URL,
};

module.exports = config;