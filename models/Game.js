const mongoose = require('mongoose');
const Player = require('./Player');
const Quiz = require('./Quiz');
const gameSchema = mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    name: String,
    owner : String,
    pin : Number,
    creationDate : Date,
    startDate: Date,
    endDate: Date,
    status: String,
    players : [Player.schema],
    currentQuestion : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
}
);


module.exports = mongoose.model('Game', gameSchema);