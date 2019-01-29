const { PostController } = require('./controller');
const { PostService } = require('./service');
const { postRouter } = require('./router');
const { Repository } = require('../core/repository');
const Post = require('./model');
const User = require('../user/model');

class PostModule {
    constructor() {
        this.postRepository = new Repository(Post);
        this.userRepository = new Repository(User);
        this.postService = new PostService(
            this.postRepository,
            this.userRepository
        );
        this.postController = new PostController(this.postService);

        this.setRoute = this.setRoute.bind(this);
    }

    setRoute(middlewares) {
        return postRouter(this.postController, middlewares);
    }
}

module.exports = { PostModule };


