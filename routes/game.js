const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

/* POST CREATE GAME. */
router.post('/', GameController.createGame);
router.post('/join', GameController.joinGame);
module.exports = router;