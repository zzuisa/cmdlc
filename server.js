const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
let cors = require('cors');
const moment = require('moment');
let jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);
let expressJWT = require('express-jwt');
const config = require('./config/config');
const webpackConfig = require('./webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
let server_host = process.env.YOUR_HOST || '0.0.0.0';

const socketPort = 8881;
const { T } = require('./server/models/entity/R');

let R = new T();
// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes

let date = moment.utc().format();
let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');

require('./server/routes')(app);

if (isDev) {
    const compiler = webpack(webpackConfig);

    app.use(historyApiFallback({
        verbose: false,
    }));

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.resolve(__dirname, './client/public'),
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    }));

    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, './dist')));
    app.use('/res', express.static('./dist/files'));
} else {
    app.use(express.static(path.resolve(__dirname, './dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './dist/index.html'));
        res.end();
    });
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // let whiteUrl = ['/api/login', '/api/register'];
    // if (!url.includes('api/') || whiteUrl.indexOf(url) >= 0) {
    //     next();
    // }
    next();
});

let { secretOrPrivateKey } = config;
// app.use(expressJWT({
//     secret: secretOrPrivateKey, algorithms: ['HS256'],
// }).unless({
//     path: ['/api/login', '/api/register'],
// }));

let connectedUser = [];

io.on('connection', (socket) => {
    updateUserName();
    let userName = '';
    console.log('connection');
    // login
    socket.on('login', (name, callback) => {
        if (name.trim().length === 0) {
            return;
        }
        callback(true);
        userName = name;
        connectedUser.push(userName);
        updateUserName();
    });
    // Receive Chat Message
    socket.on('client_slide_message', (msg) => {
        console.log('client_slide_message', msg);
        io.sockets.emit('server_slide_message', {
            eventName: msg.eventName,
            name: 'user',
            _id: new Date().getTime(),
            msg: msg.content,
            create_time: local,
        });
    });
    socket.on('client_slide_comment', (msg) => {
        io.sockets.emit('server_slide_comment', {
            eventName: msg.eventName,
            name: 'user',
            _id: new Date().getTime(),
            msg: msg.content,
            create_time: local,
        });
    });

    // Disconnect
    socket.on('disconnect', () => {
        let logoutmsg = `${userName} left the chat room`;
        socket.emit('logout', logoutmsg);
        connectedUser.splice(
            connectedUser.indexOf(userName) === -1
                ? 99999
                : connectedUser.indexOf(userName),
            1,
        );
        updateUserName();
    });

    // update username
    function updateUserName() {
        io.emit('loadUser', connectedUser);
    }
});
server.listen(port, server_host, (err) => {
    if (err) {
        console.log(err);
    }
});

// server.listen(socketPort, { log: false, origins: '*:*' }, () => {
//
// });
module.exports = app;
