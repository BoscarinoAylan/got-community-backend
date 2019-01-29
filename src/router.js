const Router = require('express').Router();

function rootRouter(appModule) {
    const userModule = appModule.getModule('user');
    const authModule = appModule.getModule('auth');
    const postModule = appModule.getModule('post');

    Router.use('/api/user', userModule.setRoute());
    Router.use('/api/auth', authModule.setRoute());
    Router.use('/api/post', postModule.setRoute());

    return Router;
}

module.exports = { rootRouter }; 