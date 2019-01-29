
const { UserModule } = require('./user/module');
const { AuthModule } = require('./auth/module');
const { PostModule } = require('./post/module');
const { CommentModule } = require('./comment/module');
const { Middleware } = require('./core/middleware');

class AppModule {
    constructor() {
        this.userModule = new UserModule();
        this.authModule = new AuthModule();
        this.postModule = new PostModule();
        this.commentModule = new CommentModule();
        this.middlewares = new Middleware(
            this.authModule.getAuthService()
        );
        this.getModule = this.getModule.bind(this);
    }

    getModule(module) {
        switch (module) {
        case 'user':
            return this.userModule;
        case 'auth':
            return this.authModule;
        case 'post':
            return this.postModule;
        case 'comment':
            return this.commentModule;
        default:
            return undefined;
        }
    }

    getMiddlewares() {
        return this.middlewares;
    }
    
}

function createAppModule() {
    return new AppModule();
}

module.exports = { createAppModule };