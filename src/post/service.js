class PostService {

    constructor(
        postRepository,
        userRepository
    ) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;

        this.createPost = this.createPost.bind(this);
        this.listPosts = this.listPosts.bind(this);
        this.getPost = this.getPost.bind(this);
        this.destroyPost = this.destroyPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }

    async createPost(authorId, title, body) {
        return await this.postRepository.create({
            authorId, title, body
        });
    }

    async listPosts(authorId) {
        const feature = authorId && 'where';
        return await this.postRepository.findAll({
            [feature]: { authorId },
            attributes: ['title', 'createdAt', 'id'],
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                required: true,
                as: 'author',
                model: this.userRepository.getModel(),
                attributes: ['name', 'id'],
                association: 'author'
            }],
        });
    }

    async getPost(id) {
        return await this.postRepository.findOne({ 
            where: { id },
            include: [{
                required: true,
                as: 'author',
                model: this.userRepository.getModel(),
                attributes: ['name', 'id'],
                association: 'author'
            }],
        });
    }

    async destroyPost(id) {
        return await this.postRepository.destroy({
            where: { id }
        });
    }

    async updatePost(id, title, body) {
        return await this.postRepository.update(
            { title, body },
            { where: { id } }
        );
    }

    async listPostsPaginated(page = 1, postsPerPage = 10, defaulOffset = 0) {
        return await this.postRepository.findAll({
            attributes: ['title', 'body', 'createdAt', 'id'],
            limit: 10,
            offset: page > 1 ? (page - 1) * postsPerPage : defaulOffset,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                required: true,
                as: 'author',
                model: this.userRepository.getModel(),
                attributes: ['name', 'id', 'createdAt'],
                association: 'author'
            }],
        });
    }
}

module.exports = { PostService };
