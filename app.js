const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const indexRouter = require('./Routes/index');
const songsRouter = require('./Routes/song.route');
const playlistRouter = require('./Routes/playlist.route');
const adRouter = require('./Routes/ad.route');

//import database
const mongoose = require('mongoose');
const configDB = require('./mongodb/data/mongodb.json');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/songs', songsRouter);
app.use('/playlists', playlistRouter);
app.use('/ads', adRouter);

//Mongo config
const mongoURI = configDB.mongo.uri;
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true , useUnifiedTopology: true },
    ()=> console.log("Connected to DataBase "));
// const conn = mongoose.connection;
// conn.on('error', error => console.error(error));
// conn.once('open', () => console.log('Connected to Mongoose'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
