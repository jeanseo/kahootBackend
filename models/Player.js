const mongoose = require('mongoose');
const Answer = require('./Answer');
const Question = require('./Question');


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
            points: Number,
            correct: Boolean,
        }
    ]
}
);

playerSchema.virtual('score').get(function() {

    let score = 0;
    console.log(this.answers);
    this.answers.forEach((answer)=>{

        console.log(answer.points);
        score += calculateScore(answer.correct, answer.points);
    });
    return score;
});


playerSchema.path('answers').schema.virtual('score').get(async function() {

    //Verifier si la réponse est correcte
    return calculateScore(this.correct, this.points);

});

playerSchema.set('toObject', { virtuals: true });
playerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Player', playerSchema);

calculateScore = (correct, points) =>{
    if (correct)
        return points;
    else
        return 0;};