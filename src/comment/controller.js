class CommentController {
    constructor(commentService) {
        this.commentService = commentService;

        this.create = this.create.bind(this);
        this.index = this.index.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    async index(req, res, next) {
        try {

            if (!req.query.postId) {
                return res.status(403).end();
            }

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
            const commentData = req.body.body;
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

    async update(req, res, next) {
        try {
            const commentId = req.params.id;
            const authorId = res.locals.payload.id;

            const comment = await this.commentService.getComment(commentId);

            if (!comment) {
                return res.status(404).end();
            }

            if (comment.authorId === authorId) {
                await this.commentService.updateComment(
                    req.params.id,
                    req.body.body
                );
                return res.status(200).end();
            }
            return res.status(401).end();
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const commentId = req.params.id;
            const authorId = res.locals.payload.id;

            const comment = await this.commentService.getComment(commentId);

            if (!comment) {
                return res.status(404).end();
            }

            if (comment.authorId === authorId) {
                await this.commentService.destroyComment(commentId);
                return res.status(200).end();
            }
            res.status(401).end();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = { CommentController };
