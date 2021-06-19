/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    // API routes
    fs.readdirSync(`${__dirname}/api/`).forEach((file) => {
        // eslint-disable-next-line global-require
        require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
    });
};
