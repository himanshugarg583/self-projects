const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB (Updated connection string with 127.0.0.1 instead of localhost)
mongoose
  .connect('mongodb://127.0.0.1:27017/hostel', {
    useNewUrlParser: true, // Recommended for MongoDB 4.x+
    useUnifiedTopology: true, // Recommended for MongoDB 4.x+
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  });
  app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Hostel Management API</h1><p>Use endpoints like <code>/students</code> to interact with the API.</p>');
  });
  
// Define a Mongoose schema for students
const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  admissionDate: { type: String, required: true },
  contact: { type: String, required: true },
});

// Create a Mongoose model for students
const Student = mongoose.model('Student', studentSchema);

// Routes

// 1. Add a new student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body); // Create a new student object
    const savedStudent = await student.save(); // Save the student to the database
    res.status(201).json(savedStudent); // Return the saved student as a response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Return a 400 status for validation errors
  }
});

// 2. Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.json(students); // Return the list of students
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return a 500 status for server errors
  }
});

// 3. Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id); // Delete the student by ID
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return a 500 status for server errors
  }
});

// 4. Update a student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent); // Return the updated student
  } catch (error) {
    res.status(400).json({ error: error.message }); // Return a 400 status for validation errors
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
