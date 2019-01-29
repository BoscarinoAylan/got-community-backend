const Router = require('express').Router();

function postRouter(postController, middlewares) {
    Router.get('/', postController.index);
    Router.get('/:id', postController.show);
    Router.post('/', middlewares.authenticateRequests, postController.create);
    Router.put('/:id', middlewares.authenticateRequests, postController.update);
    Router.delete('/:id', middlewares.authenticateRequests, postController.destroy);
    return Router;
}

module.exports = { postRouter };