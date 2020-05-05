const Game = require('../models/Game');
const Quiz = require('../models/Quiz');

const gameStatus = {
    pending : "pending",
    started : "started",
    finished : "finished"
};

exports.getOneGame = (req, res, next) => {
    if (!req.params._id)
        res.status(404);
    Game.findOne({ _id: req.params.id})
        .populate({
        path:'quiz',
        model:'Quiz'
    })
        .populate({
            path:'players.answers.question',
            model:'Question'
        })
        .then((game) => {
            console.log(game);
            res.status(200).json(game)})
        .catch((err) => res.status(404).json({err}))
};


exports.createGame = async (req, res) => {
    // Vérifier  l'id du quiz
    console.log("création d'un game");
    const quiz = await Quiz.findOne({_id: req.params.id});
    if (!quiz){
        return res.status(404).send('Quiz not found');
    }
    console.log("quiz existant "+req.body.quizId);

    //On génère un PIN qui doit être unique
    let pin;
    let pinExists = true;
    while(pinExists){
        pin = Math.floor(100000 + Math.random() * 900000);
        pinExists = await Game.exists({pin: pin});
    }
    console.log("pin: "+pin);

    let game = new Game({
        name: req.body.name,
        owner: req.body.owner,
        pin: pin,
        quiz: quiz,
        creationDate: Date.now(),
        status: gameStatus.pending,
    });
    console.log(game);

    game.save()
        .then(()=>res.status(201).json(game))
        .catch((err)=>res.send(err));
};

exports.joinGame = async (req, res,) => {
    console.log('joingame');

    if (!req.body.name){
        return res.status(500).json({message : "name missing"});
    }
    if (!req.body.pin) {
        return res.sendStatus(404);
    }
    //  récupérer le game associé
    let game = await Game.findOne({pin : req.body.pin});
    if(game == null){
        return res.sendStatus(404);
    }
    game.players.push({
        name: req.body.name,
        joinedDate: Date.now()
    });
    //On doit retourner l'_id du joueur
    console.log(game);
    const playerId = game.players[game.players.length-1]._id;

    game.save()
        .then(()=>res.status(200).json({gameId:game._id, playerId: playerId}))
        .catch((err)=>res.send(err));
};

exports.startGame = async (req, res,) => {
    const game = await Game.findById(req.body.id)
        .populate({
            path:'quiz',
            model: 'Quiz'

        });
    if(game == null){
        return res.sendStatus(404);
    }
    //Peut-être vérifier qu'il y a au moins un ou deux joueurs

    game.status = gameStatus.started;
    game.startDate = Date.now();
    console.log(game.quiz);
    if(game.quiz.questions.length > 0){
        game.currentQuestion = game.quiz.questions[0]._id;
    }



    game.save()
        .then(()=>res.status(200).json(game))
        .catch((err)=>res.send(err));
};

exports.submitAnswer = async (req, res,) => {
    //On récupère le joueur
    if (!req.body.player || !req.body.question || !req.body.answer || !req.body.game){
        return res.sendStatus(500);
    }

    const game = await Game.findById(req.body.game)
        .populate({
            path:'quiz',
            model: 'Quiz'

        });
    if(game == null){
        return res.sendStatus(404);
    }
    console.log(game.quiz.questions);
    const question = game.quiz.questions.find(q => q.id === req.body.question);
    const answer = question.answers.find(a => a.id === req.body.answer);
    let player = game.players.find(p => p.id === req.body.player);


    player.answers.push({
        question: req.body.question,
        answer: req.body.answer,
        answeredTime: Date.now(),
        points: question.points,
        correct: answer.correct,
    });

    game.save()
        .then(()=>res.status(200).json())
        .catch((err)=>res.send(err));

};

