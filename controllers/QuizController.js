const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.createQuiz = (req, res, next) => {
    // Récupérer l'id du
};

exports.getOneQuiz = (req, res, next) => {
    if (!req.params._id)
        res.status(404);
    Quiz.findOne({ _id: req.params.id}).populate('Question')
        .then((quiz) => res.status(200).json(quiz))
        .catch((err) => res.status(404).json({err}))

};

exports.updateQuiz = async (req, res, next) => {
    //récupérer l'id
    if (!req.body._id){
        return res.status(500).json({message : "id missing"});
    }

    Quiz.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then((quiz) => res.status(200).json(quiz))
        .catch(error => res.status(400).json({ error }));
};


