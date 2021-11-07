'use strict';

const express = require('express');
const app = express();

// requiring error handlers
const errorHandler_404 = require('./error-handlers/404');
const errorHandler_500 = require('./error-handlers/500');

// The starter function
function start(PORT){
    app.listen(PORT, () => {
        console.log(`Server up on port ${PORT}`);
    })
};

// Proof of life
app.get('/', (req, res) => {
    res.status(200).send('Server running successfully :D');
});

/* ----- Actual server work ----- */

// middleware to process the requests body for the sign-up:
app.use(express.json());
// middleware to process the auth header form input for the sign-in:
app.use(express.urlencoded({ extended: true }));

// Requiring the router
const usersRouter = require('./routes/users.route');
app.use(usersRouter);

// Error handling:
app.use('*', errorHandler_404);
app.use(errorHandler_500);



module.exports = {app, start};