class UserController {
    constructor(userService) {
        this.createUser = this.createUser.bind(this);
        this.userService = userService;
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
}

module.exports = { UserController };
