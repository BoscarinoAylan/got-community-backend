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
                attributes: ['name', 'id'],
                association: 'author'
            }]
        });
    }
}

module.exports = { CommentService };