const mongoose = require('mongoose');
const Game = require('./Game');
const Question = require('./Question');

const quizSchema = mongoose.Schema({
    name: String,
    questions :[Question.schema],
    owner : String,
    games: [Game.schema]
    //mots clés, domaines, difficulté,...
});

module.exports = mongoose.model('Quiz', quizSchema);