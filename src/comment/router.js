const Router = require('express').Router();

function commentRouter(commentController, middlewares) {
    Router.get('/', commentController.index);
    Router.post('/', middlewares.authenticateRequests, commentController.create);
    Router.put('/:id', middlewares.authenticateRequests, commentController.update);
    Router.delete('/:id', middlewares.authenticateRequests, commentController.destroy);
    return Router;
}

module.exports = { commentRouter };
