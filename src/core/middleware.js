const emailValidator = require('email-validator');
const PasswordValidator = require('password-validator');

const { AuthService } = require('../auth/service');

module.exports.Middleware = class Middleware {
    constructor() {
        this.authService = new AuthService();
        this.requestAuthentication = this.requestAuthentication.bind(this);
    }

    async requestAuthentication(req, res, next) {
        if (
            !req.headers.authorization ||
            req.headers.authorization.split(' ').length !== 2
        ) {
            return res.satus(401).end();
        }

        const token = req.headers.authorization.split(' ')[1];

        this.authService.tokenIsValid(token, (error, payload) => {
            if (error) {
                return res.status(401).end();
            }

            if (this.authService.tokenIsBlacklisted) {
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

    vaidatePassword(req, res, next) {
        const { password } = req.body;
        const passwordValidator = new PasswordValidator();

        passwordValidator
            .is().min(8)
            .has().lowercase()
            .has().digits()
            .has().not().spaces();

        if(!passwordValidator.validate(password)) {
            return res.status(400).end();
        }

        return next();
    }
};
