const Router = require('express').Router();

const { UserController } = require('./controller');

const userController = new UserController();

Router.get('/', (req, res, next) => res.send('chegaste aqui') );
Router.post('/', userController.createUser);

module.exports = Router; 