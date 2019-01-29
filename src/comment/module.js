const { CommentController } = require('./controller');
const { CommentService } = require('./service');
const { commentRouter } = require('./router');
const { Repository } = require('../core/repository');
const Comment = require('./model');
const User = require('../user/model');
const Post = require('../post/model');

class CommentModule {
    constructor() {
        this.commentRepository = new Repository(Comment);
        this.postRepository = new Repository(Post);
        this.userRepository = new Repository(User);
        this.commentService = new CommentService(
            this.commentRepository,
            this.postRepository,
            this.userRepository
        );
        this.commentController = new CommentController(this.commentService);

        this.setRoute = this.setRoute.bind(this);
    }

    setRoute(middlewares) {
        return commentRouter(this.commentController, middlewares);
    }
}

module.exports = { CommentModule };