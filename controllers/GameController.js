const Game = require('../models/Game');
const Quiz = require('../models/Quiz');

exports.createGame = async (req, res) => {

    // Vérifier  l'id du quiz
    console.log("création d'un game");
    const quizExists = await Quiz.exists({_id: req.body.quizId});
    if (!quizExists){
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
        quiz: req.body.quizId,
        creationDate: Date.now()
    });
    console.log(game);

    game.save()
        .then(()=>res.status(201).json(game))
        .catch((err)=>res.send(err));
};

exports.joinGame = async (req, res,) => {

    if (!req.body.name){
        return res.status(500).json({message : "name missing"});
    }
    if (!req.body.pin) {
        return res.sendStatus(404);
    }
    //  récupérer le game associé
    const game = await Game.findOne({pin : req.body.pin});
    if(game == null){
        return res.sendStatus(404);
    }
    game.participants.push({
        name: req.body.name,
        joinedDate: Date.now()
    });

    game.save()
        .then((result)=>res.status(200).json(result))
        .catch((err)=>res.send(err));
    console.log(game);
};