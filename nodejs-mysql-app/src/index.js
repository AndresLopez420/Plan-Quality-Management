//Inicializar
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash= require('connect-flash');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');

const app = express(); 
require('./lib/passport');

//Ajustes
app.set('port',4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret:'plan quality management ',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(morgan( 'dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next)=> {
    app.locals.aceptado = req.flash('Aceptado');
    app.locals.mensaje = req.flash('mensaje');
    app.locals.user = req.user;
    next();
});



//Routes
app.use(require( './routes/index.js'));
app.use(require( './routes/authentication'));
app.use('/formularios',require( './routes/formularios'));


//Variables Publicas
app.use(express.static(path.join(__dirname, 'public')));


//Arranque de servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port')); 
});