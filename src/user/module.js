const { UserController } = require('./controller');
const { UserService } = require('./service');
const { userRouter } = require('./router');
const { Repository } = require('../core/repository');
const User = require('./model');

class UserModule {

    constructor() {
        this.userRepository = new Repository(User);
        this.userService = new UserService(this.userRepository);
        this.userController = new UserController(this.userService);
        
        this.setRoute = this.setRoute.bind(this);
    }

    setRoute(middlewares) {
        return userRouter(this.userController, middlewares);
    }
}

module.exports = { UserModule };
