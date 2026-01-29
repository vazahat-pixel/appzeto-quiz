const Result = require('../models/Result');
const User = require('../models/User');

// @desc    Save quiz result
// @route   POST /api/result
// @access  Protected
const saveResult = async (req, res, next) => {
    try {
        const { category, difficulty, score, percentage, remark } = req.body;

        const result = await Result.create({
            user: req.user._id,
            category,
            difficulty,
            score,
            percentage,
            remark
        });

        // Update unlocked level based on percentage (90%+)
        if (percentage >= 90) {
            const user = await User.findById(req.user._id);
            let nextLevel = user.levelUnlocked;

            if (user.levelUnlocked === 'easy' && difficulty === 'easy') {
                nextLevel = 'medium';
            } else if (user.levelUnlocked === 'medium' && difficulty === 'medium') {
                nextLevel = 'hard';
            }

            if (nextLevel !== user.levelUnlocked) {
                user.levelUnlocked = nextLevel;
                await user.save();
            }
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch user quiz history
// @route   GET /api/result/user
// @access  Protected
const getUserResults = async (req, res, next) => {
    try {
        const results = await Result.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(results);
    } catch (error) {
        next(error);
    }
};

module.exports = { saveResult, getUserResults };
