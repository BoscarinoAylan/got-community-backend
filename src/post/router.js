const Router = require('express').Router();

function postRouter(postController, middleware) {
    Router.get('/', postController.index);
    Router.post('/', middleware.authenticateRequests, postController.create);
    Router.put('/:id', middleware.authenticateRequests, postController.update);
    Router.delete('/:id', middleware.authenticateRequests, postController.destroy);
    return Router;
}

module.exports = { postRouter };