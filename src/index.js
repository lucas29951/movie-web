const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database, PORT } = require('./keys');

// inicializations
const app = express();
require('./lib/passport');

// settings
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// middlewares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.files = req.files;
    app.locals.movies = req.movies;
    app.locals.series = req.series;
    app.locals.animes = req.animes;
    next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/media',require('./routes/media'));
app.use('/files',require('./routes/files'));
app.use('/movies',require('./routes/movies'));
app.use('/series',require('./routes/series'));
app.use('/animes',require('./routes/animes'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});