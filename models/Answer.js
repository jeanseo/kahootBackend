const mongoose = require('mongoose');


const answerSchema = mongoose.Schema({
    answer : String,
    correct: Boolean,
    active: Boolean
});

module.exports = mongoose.model('Answer', answerSchema);