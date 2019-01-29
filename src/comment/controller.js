class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }

    async index(req, res, next) {
        try {
            const comments = await this.commentService.findCommentsByPost(
                req.query.postId
            );
            return res.json(comments);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const commentData = req.body;
            const author = res.locals.payload;
            const postId = req.query.postId;
            await this.commentService.createComment(
                author.id,
                postId,
                commentData
            );
            return res.status(201).end();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = { CommentController };