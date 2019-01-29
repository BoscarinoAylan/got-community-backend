const { UserController } = require('./controller');
const { UserService } = require('./service');
const { userRouter } = require('./router');

class UserModule {

    constructor() {
        this.userService = new UserService();
        this.userController = new UserController(this.userService);
        
        this.setRoute = this.setRoute.bind(this);
    }

    setRoute() {
        return userRouter(this.userController);
    }
}

module.exports = { UserModule };
