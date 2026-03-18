const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const multer = require('multer');
const path = require('path');
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // JSON 
app.use(cors()); // cross origion

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Files 'uploads' folder mein save hongi
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
  });
  const upload = multer({ storage: storage });
  
  // Static folder for uploaded files
  app.use('/uploads', express.static('uploads'));

// db connect
connectDB();

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});