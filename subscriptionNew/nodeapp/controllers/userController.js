const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ritesh';

// Register/Signup User
async function registerUser(req, res) {
    try {
        const { userName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { userName }] 
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already registered' });
            }
            if (existingUser.userName === userName) {
                return res.status(400).json({ message: 'Username already taken' });
            }
        }

        // Create new user (password will be hashed by pre-save hook)
        const newUser = await User.create({
            userName,
            email,
            password
        });

        return res.status(201).json({ 
            message: 'User registered successfully',
            userId: newUser._id
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Login User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password using the model method
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: user._id, 
                    userName: user.userName,
                    email: user.email 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Set token in cookie (optional)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            return res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    userId: user._id,
                    userName: user.userName,
                    email: user.email
                }
            });
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get User Profile
async function getUserProfile(req, res) {
    try {
        const userId = req.user.userId; // From auth middleware

        const user = await User.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            user: {
                userId: user._id,
                userName: user.userName,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Update User Profile
async function updateUserProfile(req, res) {
    try {
        const userId = req.user.userId;
        const { userName, email } = req.body;

        // Check if new username or email already exists
        if (userName || email) {
            const existingUser = await User.findOne({
                _id: { $ne: userId },
                $or: [
                    { userName: userName },
                    { email: email }
                ]
            });

            if (existingUser) {
                if (existingUser.userName === userName) {
                    return res.status(400).json({ message: 'Username already taken' });
                }
                if (existingUser.email === email) {
                    return res.status(400).json({ message: 'Email already registered' });
                }
            }
        }

        const updateData = {};
        if (userName) updateData.userName = userName;
        if (email) updateData.email = email;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                userId: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email
            }
        });

    } catch (error) {
        console.error('Update profile error:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Change Password
async function changePassword(req, res) {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        user.comparePassword(currentPassword, async (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }

            try {
                // Update password (will be hashed by pre-save hook)
                user.password = newPassword;
                await user.save();

                return res.status(200).json({ message: 'Password changed successfully' });
            } catch (validationError) {
                if (validationError.name === 'ValidationError') {
                    const messages = Object.values(validationError.errors).map(err => err.message);
                    return res.status(400).json({ message: messages.join(', ') });
                }
                throw validationError;
            }
        });

    } catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Delete User Account
async function deleteUser(req, res) {
    try {
        const userId = req.user.userId;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clear cookie
        res.clearCookie('token');

        return res.status(200).json({ message: 'Account deleted successfully' });

    } catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Logout User
function logoutUser(req, res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get All Users (Admin only - optional)
async function getAllUsers(req, res) {
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json({ users });
    } catch (error) {
        console.error('Get all users error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser,
    logoutUser,
    getAllUsers
};