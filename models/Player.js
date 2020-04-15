const mongoose = require('mongoose');
const Answer = require('./Answer');


const playerSchema = mongoose.Schema({
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
            creationTime: Date,
            answeredTime: Date,
        }
    ]
}
);

playerSchema.virtual('score').get(function() {
    return 1000;
});


playerSchema.path('answers').schema.virtual('score').get(function() {
    console.log(this.question);
    return 69;
});

module.exports = mongoose.model('Player', playerSchema);