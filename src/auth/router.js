const Router = require('express').Router();

function authRouter(authController) {
    Router.post('/login', authController.logIn);
    
    return Router;
}

module.exports = { authRouter };