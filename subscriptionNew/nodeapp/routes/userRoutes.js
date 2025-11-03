const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser,
    logoutUser,
    getAllUsers
} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.put('/change-password', authenticateToken, changePassword);
router.delete('/delete-account', authenticateToken, deleteUser);

// Admin route (optional)
router.get('/all-users', authenticateToken, getAllUsers);

module.exports = router;