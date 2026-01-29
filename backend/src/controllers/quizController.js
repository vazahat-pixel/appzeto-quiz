const Question = require('../models/Question');

// @desc    Get questions by category and difficulty
// @route   GET /api/quiz/:category/:difficulty
// @access  Protected
const getQuestions = async (req, res, next) => {
    try {
        const { category, difficulty } = req.params;

        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            res.status(400);
            throw new Error('Invalid difficulty level');
        }

        // Limit to 10 questions and randomize
        // Note: For $sample to work efficiently, a reasonable number of docs is needed. 
        // If collection is small, it just returns random docs.
        const questions = await Question.aggregate([
            { $match: { category, difficulty } },
            { $sample: { size: 10 } }
        ]);

        if (questions) {
            res.json(questions);
        } else {
            res.status(404);
            throw new Error('No questions found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getQuestions };
