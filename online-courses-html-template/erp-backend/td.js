const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Use cors to allow cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/attendance', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection failed:', error);
});

// Define teacher schema and model
const teacherSchema = new mongoose.Schema({
    name: String,
    subject: String,
    experience: String,
    location: String,
    contact: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// GET route to fetch teachers data
app.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find(); // Fetch teachers from MongoDB
        res.json(teachers); // Return the teachers data
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error handling
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
