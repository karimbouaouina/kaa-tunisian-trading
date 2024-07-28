const config = require('../config/config');
const mongoose = require('mongoose');

const db = {
    mongoose : mongoose,
    url: config.DB_URL,
};

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
module.exports = db;