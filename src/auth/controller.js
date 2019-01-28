const { AuthService } = require('./service');

module.exports.AuthController = class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.logIn = this.logIn.bind(this);
    }
    
    async logIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.logIn(email, password);

            if (token.length === 0) {
                return res.status(401).end();
            }

            return res.json({ token });

        } catch (error) {
            return next(error);
        }
    }
};