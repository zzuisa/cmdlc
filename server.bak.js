const nodemon = require('nodemon');
const path = require('path');

nodemon({
    execMap: {
        js: 'node',
    },
    script: path.join(__dirname, '/server'),
    ignore: [],
    watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
    ext: 'js',
})
    .on('restart', () => {
        console.log('Server restarted!');
    })
    .once('exit', () => {
        console.log('Shutting down server');
        process.exit();
    });
