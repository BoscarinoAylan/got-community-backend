class PostController {
    constructor(postService) {
        this.postService = postService;

        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    async index(req, res, next) {
        try {
            const posts = await this.postService.listPosts(req.query.id);
            return res.json(posts);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const postData = req.body;
            const author = res.locals.payload;
            await this.postService.createPost(
                author.id,
                postData.title,
                postData.body
            );
            return res.status(201).end();
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            const postId = req.params.id;
            const authorId = res.locals.payload.id;

            const post = await this.postService.getPost(postId);

            if (post.authorId === authorId ) {
                await this.postService.updatePost(
                    req.params.id,
                    req.body.title,
                    req.body.body,
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
            const postId = req.params.id;
            const authorId = res.locals.payload.id;

            const post = await this.postService.getPost(postId);

            if (post.authorId === authorId ) {
                await this.postService.destroyPost(post.id);
                return res.status(200).end();
            }
            return res.status(401).end();            
        } catch (error) {
            return next(error);
        }
    }

}

module.exports = { PostController };