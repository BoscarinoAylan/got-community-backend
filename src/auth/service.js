const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const environment = process.env.NODE_ENV || 'development';
const config = require('../core/config')[environment];
const { UserService } = require('../user/service');
const BlackList = require('./model');

module.exports.AuthService = class AuthService {
    constructor() {
        this.userService = new UserService();
        this.logIn = this.logIn.bind(this);
    }

    async logIn(email, password) {
        const user = await this.userService.findByEmail(email);
        const hash = crypto.pbkdf2Sync(
            password, user.dataValues.salt, 100, 100, 'sha256'
        ).toString('hex');
            
        if (user.dataValues.hash === hash) {
            return jwt.sign({
                id: user.dataValues.id,
                email: user.dataValues.email,
                name: user.dataValues.name
            },
            config.jwtSecret,
            {
                expiresIn: 3600
            });
        }
        return '';
    }

    async logOut(token) {
        const tokensList = await BlackList.find({ token });
        if (tokensList.length === 0) {
            const invalidToken = new BlackList({ token });
            invalidToken.save();
        }
    }

    async tokenIsBlacklisted(token) {
        const tokensList = await BlackList.find({ token });
        return tokensList > 0;
    }

    async tokenIsValid(token, callback) {
        return jwt.verify(token, config.jwtSecret, callback);
    }
};