
const { UserModule } = require('./user/module');
const { AuthModule } = require('./auth/module');
const { PostModule } = require('./post/module');

class AppModule {
    constructor() {
        this.userModule = new UserModule();
        this.authModule = new AuthModule();
        this.postModule = new PostModule();

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
        default:
            return undefined;
        }
    }
    
}

function createAppModule() {
    return new AppModule();
}

module.exports = { createAppModule };