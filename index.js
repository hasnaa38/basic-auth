'use strict';

const { start } = require('./src/server');
require('dotenv').config();

const { db } = require('./src/database/index');

db.sync().then(() => {
    const PORT = process.env.PORT || 3030;
    start(PORT);
}).catch(console.error);

