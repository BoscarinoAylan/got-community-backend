class CommentService {
    constructor(
        commentRepository,
        postRepository,
        userRepository
    ) {

        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    async findAll() {
        return await this.commentRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async createComment(authorId, postId, body) {
        return await this.commentRepository.create({
            authorId, postId, body
        });
    }

    async findCommentsByPost(postId) {
        return await this.commentRepository.findAll({
            where: { postId },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                required: true,
                as: 'author',
                model: this.userRepository.getModel(),
                attributes: ['name', 'createdAt'],
                association: 'author'
            }]
        });
    }

    async getComment(id) {
        return await this.commentRepository.findOne({ 
            where: { id }
        });
    }

    async destroyComment(id) {
        return await this.commentRepository.destroy({
            where: { id }
        });
    }

    async updateComment(id, body) {
        return await this.commentRepository.update(
            { body },
            { where: { id }}
        );
    }
}

module.exports = { CommentService };