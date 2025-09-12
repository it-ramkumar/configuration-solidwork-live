require('dotenv').config();

const environment = {
  MONGODB_URI:'mongodb://127.0.0.1:27017/santa_monika',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = environment;