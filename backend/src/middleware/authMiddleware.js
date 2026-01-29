const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            const err = new Error('Not authorized, token failed');
            next(err);
        }
    }

    if (!token) {
        res.status(401);
        const err = new Error('Not authorized, no token');
        // Only call next with error if we haven't already responded (or just rely on error handler)
        // Check if headers sent to avoid double response if the catch block above executed?
        // Actually, if !token is true, the if block above didn't execute or didn't find token.
        // But if headers.auth exists but doesn't start with Bearer, it comes here.
        next(err);
    }
};

module.exports = { protect };
