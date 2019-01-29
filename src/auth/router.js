const Router = require('express').Router();

function authRouter(authController, middlewares) {
    Router.post('/login', authController.logIn);
    
    return Router;
}

module.exports = { authRouter };