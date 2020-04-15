const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
    question: String,
    answers : [{
            answer : String,
            correct: Boolean
        }],
    order : Number,
    time: Date,
    points: Number
});

module.exports = mongoose.model('Question', questionSchema);