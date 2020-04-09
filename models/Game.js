const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: String,
    owner : String,
    pin : Number,
    creationDate : Date,
    startDate: Date,
    endDate: Date,
    participants : [{
        name : String,
        joinedDate: Date,
        answers : [
            {
                question : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question"
                },
                answer : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Answer"
                },
                answeredTime: Date
            }
        ]
    }]
});

module.exports = mongoose.model('Game', gameSchema);