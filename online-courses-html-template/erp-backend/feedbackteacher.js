const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const feedbackSchema = new mongoose.Schema({
    teacherName: String,
    studentName: String,
    subject: String,
    feedback: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.post("/submit-feedback", async (req, res) => {
    const { teacherName, studentName, subject, feedback } = req.body;
    try {
        const newFeedback = new Feedback({ teacherName, studentName, subject, feedback });
        await newFeedback.save();
        res.status(201).json({ message: "Feedback saved!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving feedback", error });
    }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
