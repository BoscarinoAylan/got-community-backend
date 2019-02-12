const emailValidator = require('email-validator');
const PasswordValidator = require('password-validator');

class Middleware {
    constructor(
        authService
    ) {
        this.authService = authService;
        this.authenticateRequests = this.authenticateRequests.bind(this);
    }

    async authenticateRequests(req, res, next) {
        if (
            !req.headers.authorization ||
            req.headers.authorization.split(' ').length !== 2
        ) {
            return res.status(401).end();
        }
        const token = req.headers.authorization.split(' ')[1];

        this.authService.tokenIsValid(token, async (error, payload) => {
            if (error) {
                return res.status(401).end();

            }

            if (await this.authService.tokenIsBlacklisted(token)) {
                return res.status(401).end();
            }

            res.locals.payload = payload;
            return next();
        });
    }

    validateUser(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).end();
        }

        if (!emailValidator.validate(email)) {
            return res.status(400).end();
        }

        return next();
    }

    validatePassword(req, res, next) {
        const { password } = req.body;
        const passwordValidator = new PasswordValidator();

        passwordValidator
            .is().min(4)
            .has().not().spaces();

        if(!passwordValidator.validate(password)) {
            return res.status(400).end();
        }

        return next();
    }
}

module.exports = { Middleware };
