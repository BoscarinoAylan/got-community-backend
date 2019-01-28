const { UserService } = require('./service');

module.exports.UserController = class {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.userService = new UserService();
    }

    async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await this.userService.createUser({ name, email, password });
            return res.status(201).end();
        } catch (error) {
            return next(error);
        }
    }
};
