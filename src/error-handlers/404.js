'use strict';

// Sends 404/Not-Found message as the response on a bad route or a bad method

module.exports = (req, res,) => {
    res.status(404).send({
        error: 404,
        message: '404/Not-Found'
    })
}