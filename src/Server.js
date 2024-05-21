require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRouters = require('./routes/web');
const apiRouters = require('./routes/api');
const authRouters = require('./routes/auth');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 8888;
const HOST_NAME = process.env.HOST_NAME;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình express-session
app.use(session({
    secret: process.env.SESSION_SECRET, // Chuỗi bí mật để ký và mã hóa cookie, có thể thay đổi
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

configViewEngine(app);

// Routers
app.use('/', webRouters);
app.use('/', authRouters);
app.use('/v1', apiRouters);

module.exports = app;