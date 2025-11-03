const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ritesh';

function authenticateToken(req, res, next) {
    try {
        // Get token from cookie or Authorization header
        let token = req.cookies?.token;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user info to request
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { authenticateToken };