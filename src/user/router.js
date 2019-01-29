const Router = require('express').Router();

function userRouter(userController) {
    Router.post('/', userController.createUser);

    return Router;
}

module.exports = { userRouter };
