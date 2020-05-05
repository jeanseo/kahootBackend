const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');
const passport = require('passport');
require('../config/passport')(passport);

/* POST CREATE GAME. */
router.get('/:id', GameController.getOneGame);
router.post('/join', GameController.joinGame);
router.post('/:id', GameController.createGame);
router.post('/start',GameController.startGame);
router.post('/answer',GameController.submitAnswer);
module.exports = router;