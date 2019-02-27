module.exports = {
    development: {
        port: 3030,
        jwtSecret: 'a-random-secret',
        database: {
            host: 'localhost',
            port: 3306,
            name: 'forum',
            dialect: 'mysql',
            user: 'root',
            password: ''
        }
    },
    production: {
        port: process.env.EV_PORT,
        jwtSecret: process.env.JWT_SECRET,
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
            dialect: 'mysql'
        }
    }
};