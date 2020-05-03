const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');
const passport = require('passport');
require('../config/passport')(passport);

/* POST CREATE GAME. */
router.get('/:id', QuizController.getOneQuiz);
router.put('/:id', QuizController.updateQuiz);

module.exports = router;