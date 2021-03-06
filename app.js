const http = require('http');

const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/game');
const quizzesRouter = require('./routes/quiz');
const schema = require('./schema/schema');
const passport = require('passport');
require('./config/passport')(passport);
const config = require('./config/database');
const cors = require('cors');
const GameController = require('./controllers/GameController');


const app = express();
const io = require('socket.io')();
app.io = io;

//Permettre les requêtes CORS
app.use(cors());

mongoose.connect(config.database,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

//Route restAPI
app.use('/api/', indexRouter);
//Avec authentication
//app.use('/api/users',passport.authenticate('jwt', { session: false}), usersRouter);
//app.use('/api/games',passport.authenticate('jwt', { session: false}), gamesRouter);
//app.use('/api/quizzes',passport.authenticate('jwt', { session: false}), quizzesRouter);
//Sans authentification
app.use('/api/users', usersRouter);
app.use('/api/games',gamesRouter);
app.use('/api/quizzes', quizzesRouter);
//Route GraphQL
app.use('/graphql', graphqlHTTP({
        //directing express-graphql to use this schema to map out the graph
        schema,
        //directing express-graphql to use graphiql when goto '/graphql' address in the browser
        //which provides an interface to make GraphQl queries
        graphiql:true
}));

const game = io
    .of('/games')
    .on('connection', function (socket) {
        GameController.HandleSocket(socket);
    });



module.exports = app;
//changement ok