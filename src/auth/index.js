const Router = require('express').Router();

const { AuthController } = require('./controller');

const authController = new AuthController();

Router.post('/login', authController.logIn);

module.exports = Router;