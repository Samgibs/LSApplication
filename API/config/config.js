require('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'wayne',
    database: process.env.DB_NAME || 'lsapp_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'wayne',
    database: process.env.DB_NAME || 'lsapp_test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'wayne',
    database: process.env.DB_NAME || 'lsapp_prod_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
};
