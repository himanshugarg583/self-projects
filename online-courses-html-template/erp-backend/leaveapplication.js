const express = require('express')
const mongoose = require('mongoose')
const path=require('path')
const port= 4000


const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
 // Allow cross-origin requests for frontend-backend communication

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mps_school', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connection successful');
});

// Attendance Schema
const AttendanceSchema = new mongoose.Schema({
    name: String,
    date: Date,
    status: String, // 'Present' or 'Absent'
});
const Attendance = mongoose.model('Attendance', AttendanceSchema);

// Leave Application Schema
const LeaveSchema = new mongoose.Schema({
    name: String,
    reason: String,
    startDate: Date,
    endDate: Date,
});
const LeaveApplication = mongoose.model('LeaveApplication', LeaveSchema);

// API to fetch attendance data
app.get('/api/attendance', async (req, res) => {
    try {
        const data = await Attendance.find({});
        res.json(data);
    } catch (err) {
        console.error('Error fetching attendance data:', err);
        res.status(500).json({ error: 'Error fetching attendance data', details: err.message });
    }
});

// API to save leave application
app.post('/api/leaveapplication', async (req, res) => {
    const { name, reason, startDate, endDate } = req.body;

    // Validation
    if (!name || !reason || !startDate || !endDate) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        const newLeave = new LeaveApplication({ name, reason, startDate, endDate });
        await newLeave.save();
        res.json({ message: 'Leave application submitted successfully!' });
    } catch (err) {
        console.error('Error saving leave application:', err);
        res.status(500).json({ error: 'Error saving leave application', details: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

