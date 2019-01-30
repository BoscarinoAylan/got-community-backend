const express = require('express');
const cors = require('cors');

const database = require('./core/database');
const environment = process.env.NODE_ENV || 'development';
const config = require('./core/config')[environment];
const { rootRouter } = require('./router');
const { createAppModule } = require('./appModule');

const app = express();
const appModule = createAppModule();

app.use(express.json());
app.use(cors());
app.use(rootRouter(appModule));

database.sync({ force: false })
    .then(() => {
        const port = config.port;
        app.listen(port, () => console.log(`ouvindo a porta ${port}`));
    });