const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI (ensure MongoDB is running on localhost or update accordingly)
const mongoURI = 'mongodb://127.0.0.1:27017/school';  // Local MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process if connection fails
});

// Define Schema for Classroom
const classroomSchema = new mongoose.Schema({
    roomNumber: String,
    class: String,
    section: String,
    capacity: Number
});

// Create a Model
const Classroom = mongoose.model('Classroom', classroomSchema);

// Routes

// Get all classrooms
app.get('/classrooms', async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.json(classrooms);
    } catch (err) {
        console.error('Error fetching classrooms:', err.message);
        res.status(500).json({ message: 'Error fetching classrooms' });
    }
});

// Add a new classroom
app.post('/classrooms', async (req, res) => {
    const { roomNumber, class: className, section, capacity } = req.body;

    // Ensure required data is sent
    if (!roomNumber || !className || !section || !capacity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newClassroom = new Classroom({
        roomNumber,
        class: className,
        section,
        capacity
    });

    try {
        const savedClassroom = await newClassroom.save();
        res.status(201).json(savedClassroom);
    } catch (err) {
        console.error('Error saving classroom:', err.message);
        res.status(400).json({ message: 'Error saving classroom' });
    }
});

// Edit a classroom by ID
app.put('/classrooms/:id', async (req, res) => {
    const { roomNumber, class: className, section, capacity } = req.body;

    // Ensure required data is sent
    if (!roomNumber || !className || !section || !capacity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, {
            roomNumber,
            class: className,
            section,
            capacity
        }, { new: true });

        if (!updatedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.json(updatedClassroom);
    } catch (err) {
        console.error('Error updating classroom:', err.message);
        res.status(400).json({ message: 'Error updating classroom' });
    }
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
