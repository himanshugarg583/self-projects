// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const LeaveRequest = require('./models/LeaveRequest');

const app = express();
app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/school';

// Connect to MongoDB with detailed error handling
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

// POST endpoint to save leave request
app.post('/api/leave-request', async (req, res) => {
    const { leaveType, leaveDate, reason, teacherId } = req.body;

    try {
        const leaveRequest = new LeaveRequest({
            leaveType,
            leaveDate,
            reason,
            teacherId
        });
        await leaveRequest.save();
        res.status(201).send('Leave request submitted successfully!');
    } catch (error) {
        console.error('Error while saving leave request:', error);
        res.status(500).send('Error while submitting leave request');
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
