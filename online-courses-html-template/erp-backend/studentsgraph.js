const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB URI - Ensure this is correct
const mongoURI = 'mongodb://127.0.0.1:27017/attendance'; // This points to your "attendance" database

const hiiDB = mongoose.createConnection('mongodb://127.0.0.1:27017/hii', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const TeacherSchema = new mongoose.Schema({
    name: String,
    subject: String,
    experience: String,
    location: String,
    contact: String,
    //image: String // URL or filename for the image
});
//const Teacher = attendanceDB.model('Teacher', TeacherSchema);
// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit if connection fails
    });

// Define a schema for students
const studentSchema = new mongoose.Schema({
    class: String,
    numberOfAdmissions: Number,
});

// Create a model for students
const Student = mongoose.model('Student', studentSchema);

// API endpoint to fetch student data
// API endpoint to fetch student data and aggregate by class (grade)
app.get('/api/students', async (req, res) => {
    try {
        // Aggregate students by 'grade' and count the number of admissions
        const aggregatedData = await Student.aggregate([
            { $group: { _id: "$grade", numberOfAdmissions: { $sum: 1 } } },  // Group by 'grade' and count the number of admissions
            { $sort: { _id: 1 } }  // Optional: sort by class name (grade)
        ]);

        // Send the aggregated data as a JSON response
        res.json(aggregatedData);
    } catch (error) {
        console.error('Error fetching students data:', error.message);
        res.status(500).json({ message: 'Error fetching students data' });
    }
});


// Serve static files like HTML, CSS, JS (Make sure "admindash1.html" is in the "public" folder)
app.use(express.static(path.join(__dirname, 'public')));


// Event Listeners for Debugging
hiiDB.on('connected', () => console.log('✅ Connected to hii database'));
attendanceDB.on('connected', () => console.log('✅ Connected to attendance database'));

hiiDB.on('error', (err) => console.error('❌ Error connecting to hii DB:', err));
attendanceDB.on('error', (err) => console.error('❌ Error connecting to attendance DB:', err));

// Define Models
const Worker = hiiDB.model('Worker', new mongoose.Schema({}));
const Teacher = attendanceDB.model('Teacher', new mongoose.Schema({}));

// API Endpoint to fetch counts
app.get('/api/attendance-data', async (req, res) => {
    try {
        const totalStaff = await Worker.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        res.json({ totalStaff, totalTeachers });
    } catch (error) {
        console.error('❌ Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/dashboard-data', async (req, res) => {
    try {
        // Get counts for Teachers, Students, and Staff
        const totalTeachers = await Teacher.countDocuments();
        const totalStudents = await Student.countDocuments();
        const totalStaff = await Worker.countDocuments();
        
        // Send the counts as a JSON response
        res.json({
            totalTeachers,
            totalStudents,
            totalStaff
        });
    } catch (error) {
        console.error('❌ Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


// API to get teacher data
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        console.log(teachers); // Log the fetched teachers to verify
        res.json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error.message);
        res.status(500).json({ message: 'Error fetching teachers' });
    }
});


// API to add a new teacher
app.post('/api/teachers', async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json({ message: 'Teacher added successfully', teacher });
    } catch (error) {
        console.error('Error adding teacher:', error.message);
        res.status(400).json({ message: 'Error adding teacher' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
