const { PostController } = require('./controller');
const { PostService } = require('./service');
const { postRouter } = require('./router');
const { Middleware } = require('../core/middleware');
const Post = require('./model');
const User = require('../user/model');

class PostModule {
    constructor() {
        this.middleware = new Middleware();
        this.postService = new PostService(Post, User);
        this.postController = new PostController(this.postService);

        this.setRoute = this.setRoute.bind(this);
    }

    setRoute() {
        return postRouter(this.postController, this.middleware);
    }
}

module.exports = { PostModule };


