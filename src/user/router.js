const Router = require('express').Router();

function userRouter(userController, middlewares) {
    Router.post('/', userController.createUser);

    return Router;
}

module.exports = { userRouter };
