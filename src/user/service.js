const crypto = require('crypto');

class UserService {

    constructor(
        userRepository
    ) {
        this.userRepository = userRepository;
        
        this.createUser = this.createUser.bind(this);
        this.findByEmail = this.findByEmail.bind(this);
    }

    async createUser({ email, name, password }) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 100, 100, 'sha256').toString('hex');
        
        return await this.userRepository.create({
            name, 
            email,
            hash,
            salt
        });
    }

    async findByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }

}

module.exports = { UserService };
