const { AuthController } = require('./controller');
const { AuthService } = require('./service');
const { authRouter } = require('./router');

class AuthModule {
    constructor() {
        this.authService = new AuthService();
        this.authController = new AuthController(this.authService);

        this.setRoute = this.setRoute.bind(this);
    }

    setRoute() {
        return authRouter(this.authController);
    }
}

module.exports = { AuthModule };
