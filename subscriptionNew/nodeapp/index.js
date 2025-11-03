const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);

mongoose
    .connect('mongodb://localhost:27017/subscriptionManager', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB - subscriptionManager database');
        app.listen(PORT, () => {
            console.log(`subscriptionManager backend listening on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

module.exports = app;