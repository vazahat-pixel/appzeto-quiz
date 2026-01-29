const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:category/:difficulty', protect, getQuestions);

module.exports = router;
