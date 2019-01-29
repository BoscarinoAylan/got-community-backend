const { AuthController } = require('./controller');
const { AuthService } = require('./service');
const { authRouter } = require('./router');
const { Repository } = require('../core/repository');
const { UserService } = require('../user/service');
const User = require('../user/model');
const Auth = require('./model');

class AuthModule {
    constructor() {
        this.authRepository = new Repository(Auth);
        this.userRepository = new Repository(User);
        this.userService = new UserService(this.userRepository);
        this.authService = new AuthService(
            this.userService,
            this.authRepository,
        );
        this.authController = new AuthController(this.authService);

        this.setRoute = this.setRoute.bind(this);
        this.getAuthService = this.getAuthService.bind(this);
    }

    setRoute(middlewares) {
        return authRouter(this.authController, middlewares);
    }

    getAuthService() {
        return this.authService;
    }
}

module.exports = { AuthModule };
