const Router = require('express').Router();

function userRouter(userController, middlewares) {
    Router.post('/', middlewares.validateUser, middlewares.validatePassword, userController.createUser);

    return Router;
}

module.exports = { userRouter };
