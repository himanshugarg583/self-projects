require('dotenv').config();  // Make sure to load the environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas using the URI from .env
const mongoURI = process.env.MONGODB_URI;

console.log("MongoDB URI: ", mongoURI);  // Check if URI is loaded properly

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas successfully!");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

// Create Mongoose Schema and Model for Admin
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    school: { type: String, required: true },
    designation: {type: String, required:true},
    acceptedTerms: { type: Boolean, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);
app.use(express.static('public'));

// API to handle signup
app.post('/signup', async (req, res) => {
    const { email, password, school, designation, acceptedTerms } = req.body;

    if (!email || !password || !school ||!designation|| acceptedTerms === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            school,
            designation,
            acceptedTerms,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });

    } catch (error) {
        console.error('Error during signup:', error);  // Log the full error for debugging
        res.status(500).json({ message: 'An error occurred while saving data', error: error.message });
    }
});



// API to handle login
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const admin = await Admin.findOne({ email });

//         if (!admin) {
//             return res.status(404).json({ message: 'Admin not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, admin.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({ message: 'Login successful', admin: { email: admin.email, school: admin.school } });

//     } catch (error) {
//         console.error('Error during login:', error);  // Log the full error for debugging
//         res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     // Find user by email
//     const user = await User.findOne({ email });
  
//     if (user && await bcrypt.compare(password, user.password)) {
//         res.json({ user: { email: user.email, role: user.role } }); // Send role in response
//     } else {
//         res.status(400).json({ error: 'Invalid credentials' });
//     }
//   });


// API to handle login
app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password); // Compare hashed passwords
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the selected role matches the user's role
        if (user.designation !== role) {
            return res.status(400).json({ error: 'Role mismatch. Please select the correct role.' });
        }

        res.status(200).json({
            user: {
                email: user.email,
                designation: user.designation,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
    }
});


// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
