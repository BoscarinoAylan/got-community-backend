const express = require('express');

const database = require('./core/database');
const environment = process.env.NODE_ENV || 'development';
const config = require('./core/config')[environment];
const rootRouter = require('./router');

const app = express();

app.use(express.json());
app.use(rootRouter);

database.sync({ force: true })
    .then(() => {
        const port = config.port;
        app.listen(port, () => console.log(`ouvindo a porta ${port}`));
    });