const express = require('express');
const router = express.Router();
const { saveResult, getUserResults } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, saveResult);
router.get('/user', protect, getUserResults);

module.exports = router;
