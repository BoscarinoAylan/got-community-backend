const Router = require('express').Router();

function authRouter(authController, middlewares) {
    Router.post('/login', authController.logIn);
    Router.post('/logout', middlewares.authenticateRequests, authController.logOut);
    
    return Router;
}

module.exports = { authRouter };