const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    category: { type: String, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    question: { type: String, required: true },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have exactly 4 options']
    },
    correctAnswer: { type: String, required: true }
}, {
    timestamps: true
});

function arrayLimit(val) {
    return val.length === 4;
}

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
