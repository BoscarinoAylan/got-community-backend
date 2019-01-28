const crypto = require('crypto');

const User = require('./model');

module.exports.UserService = class UserService {

    async createUser({email, name, password}) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 100, 100, 'sha256').toString('hex');

        return User.create({
            name, 
            email,
            hash,
            salt
        });
    }

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

};

