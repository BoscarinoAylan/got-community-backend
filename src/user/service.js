const crypto = require('crypto');

const User = require('./model');

class UserService {

    async createUser({ email, name, password }) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 100, 100, 'sha256').toString('hex');

        return await User.create({
            name, 
            email,
            hash,
            salt
        });
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

}

module.exports = { UserService };
