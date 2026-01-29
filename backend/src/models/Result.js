const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    score: { type: Number, required: true },
    percentage: { type: Number, required: true },
    remark: { type: String, required: true }
}, {
    timestamps: true
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
