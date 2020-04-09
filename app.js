const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/game');
const schema = require('./schema/schema');

const app = express();

mongoose.connect('mongodb+srv://kahoot-adm:dKUuASxwrKOUFXlJ@cluster0-hp8cv.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route restAPI
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);

//Route GraphQL
app.use('/graphql', graphqlHTTP({
        //directing express-graphql to use this schema to map out the graph
        schema,
        //directing express-graphql to use graphiql when goto '/graphql' address in the browser
        //which provides an interface to make GraphQl queries
        graphiql:true
}));

module.exports = app;
