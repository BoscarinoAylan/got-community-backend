const Router = require('express').Router();

Router.use('/api/user', require('./user'));
Router.use('/api/auth', require('./auth'));


Router.get('/', (req, res, next) => res.status(404).send());

module.exports = Router; 