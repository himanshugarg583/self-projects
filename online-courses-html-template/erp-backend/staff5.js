const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hii', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('✅ MongoDB connection successful');
});

// Worker Schema & Model
const workerSchema = new mongoose.Schema({
    name: String,
    position: String,
    contact: String,
    shift: String,
    activeSince: String
});
const Worker = mongoose.model('Worker', workerSchema);

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Routes to serve HTML pages
app.get('/', (req, res) => res.redirect('/staff2'));
app.get('/staff2', (req, res) => res.sendFile(path.join(__dirname, 'staff2.html')));
app.get('/staff', (req, res) => res.sendFile(path.join(__dirname, 'staff.html')));

// Route to save worker details
app.post('/post', async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body); // Debugging log

        const { name, position, contact, shift, activeSince } = req.body;
        if (!name || !position || !contact || !shift || !activeSince) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newWorker = new Worker({ name, position, contact, shift, activeSince });
        await newWorker.save();
        console.log("✅ Worker saved:", newWorker);
        res.status(201).json({ message: "Worker saved successfully" });
    } catch (error) {
        console.error("❌ Error saving worker:", error);
        res.status(500).json({ error: "Error saving worker" });
    }
});

// Route to get all worker details
app.get('/workers', async (req, res) => {
    try {
        const workers = await Worker.find();
        console.log("📜 Sending Workers Data:", workers);
        res.json(workers);
    } catch (error) {
        console.error("❌ Error fetching workers:", error);
        res.status(500).send('Error fetching worker details');
    }
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
