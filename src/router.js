const Router = require('express').Router();

function rootRouter(appModule) {
    const middlewares = appModule.getMiddlewares();
    
    const userModule = appModule.getModule('user');
    const authModule = appModule.getModule('auth');
    const postModule = appModule.getModule('post');
    const commentModule = appModule.getModule('comment');

    Router.use('/api/user', userModule.setRoute(middlewares));
    Router.use('/api/auth', authModule.setRoute(middlewares));
    Router.use('/api/post', postModule.setRoute(middlewares));
    Router.use('/api/comment', commentModule.setRoute(middlewares));

    return Router;
}

module.exports = { rootRouter }; 