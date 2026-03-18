const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose
.connect("mongodb://127.0.0.1:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);  // Exit if connection fails
});


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Define the Teacher schema and model
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  contact: { type: Number, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  ifsc: { type: String, required: true },
  previousSchool: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  maritalsection: { type: String, enum: ["Single", "Married"], required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  loginID: { type: String, required: true },
  password: { type: String, required: true },
});


const Teacher = mongoose.model("Teacher", teacherSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the ERP Backend! Navigate to /add-teacher or /teacher1 for specific functionality.");
});


// Route to render the teacher form
app.get("/add-teacher", (req, res) => {
    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Teacher Form</title>
    <style>
        /* Global Styles */
        body {
            font-family: 'Arial', sans-serif;
            background: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }

        .container {
            width: 100%;
            max-width: 1000px;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            animation: fadeIn 1s ease-in-out;
            overflow-y: auto;
            max-height: 90vh;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 2rem;
            color: #333;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-section h3 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #444;
        }

        label {
            font-weight: bold;
            color: #555;
        }

        input, select, textarea {
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            transition: all 0.3s ease;
            width: 100%;
        }

        input:focus, select:focus, textarea:focus {
            border-color: #4CAF50;
            outline: none;
        }

        button {
            padding: 12px 20px;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%;
        }

        button:hover {
            background-color: #45a049;
        }

        .form-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .gender-radio, .marital-status-radio {
            display: flex;
            gap: 15px;
        }

        /* Animations */
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Add Teacher</h2>

       <form id="teacherForm" onsubmit="submitTeacherForm(event); return false;">

            <!-- Personal Details -->
            <div class="form-section">
                <h3>Personal Details</h3>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>

                <label for="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required><br>

                <label for="experience">Experience:</label>
                <input type="number" id="experience" name="experience" required><br>

                <label for="location">Location:</label>
                <input type="text" id="location" name="location" required><br>

                <label for="contact">Contact:</label>
                <input type="number" id="contact" name="contact" required><br>
            </div>

            <!-- Bank Details -->
            <div class="form-section">
                <h3>Bank Details</h3>
                <label for="bankName">Bank Name (Branch):</label>
                <input type="text" id="bankName" name="bankName" required><br>

                <label for="accountNumber">Account Number:</label>
                <input type="number" id="accountNumber" name="accountNumber" required><br>

                <label for="ifsc">IFSC Code:</label>
                <input type="text" id="ifsc" name="ifsc" required><br>
            </div>

            <!-- Previous School -->
            <div class="form-section">
                <h3>Previous School</h3>
                <label for="previousSchool">Previous School:</label>
                <input type="text" id="previousSchool" name="previousSchool" required><br>
            </div>

            <!-- Date of Birth -->
            <div class="form-section">
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required><br>
            </div>

            <!-- Gender -->
            <div class="form-section">
                <label>Gender:</label>
                <div class="gender-radio" id="gender">
                    <label><input type="radio" name="gender" value="Male" required> Male</label>
                    <label><input type="radio" name="gender" value="Female"> Female</label>
                    <label><input type="radio" name="gender" value="Other"> Other</label>
                </div>
            </div>

            <!-- Marital Status -->
            <div class="form-section">
                <label>Marital Status:</label>
                <div class="marital-status-radio" id="maritalsection">
                    <label><input type="radio" name="maritalStatus" value="Single" required> Single</label>
                    <label><input type="radio" name="maritalStatus" value="Married"> Married</label>
                </div>
            </div>

            <!-- Email and Qualification -->
            <div class="form-section">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required><br>

                <label for="qualification">Qualification:</label>
                <input type="text" id="qualification" name="qualification" required><br>
            </div>

            <!-- Address -->
            <div class="form-section">
                <h3>Address</h3>
                <label for="currentAddress">Current Address:</label>
                <input type="text" id="currentAddress" name="currentAddress" required><br>

                <label for="permanentAddress">Permanent Address:</label>
                <input type="text" id="permanentAddress" name="permanentAddress" required><br>
            </div>

            <!-- Login Details -->
            <div class="form-section">
                <h3>Login Details</h3>
                <label for="loginID">Login ID:</label>
                <input type="text" id="loginID" name="loginID" required><br>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>

    <script>
       // Function to submit the form data
function submitTeacherForm(event) {
    event.preventDefault(); // Prevents the form from submitting traditionally and causing a page reload

    const form = document.getElementById('teacherForm');
    const formData = new FormData(form);

    // Manually fetch the marital status
    const maritalStatus = document.querySelector('input[name="maritalStatus"]:checked');
    if (maritalStatus) {
        formData.append('maritalsection', maritalStatus.value);
    }

    const teacherData = {};
    formData.forEach((value, key) => {
        teacherData[key] = value;
    });

    console.log(teacherData);  // Log the data to check if all fields are collected

    fetch('http://localhost:3000/add-teacher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Teacher added successfully') {
            alert('Teacher added successfully');
            form.reset();
        } else {
            alert('Failed to add teacher');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding teacher');
    });
}


</script>
</body>
</html>

  
    `);
  });
  
// Route to handle form submission
app.post("/add-teacher", async (req, res) => {
  const {
      name,
      subject,
      experience,
      location,
      contact,
      bankName,
      accountNumber,
      ifsc,
      previousSchool,
      dob,
      gender,
      maritalsection,
      email,
      qualification,
      currentAddress,
      permanentAddress,
      loginID,
      password,
  } = req.body;

  console.log("Received data:", req.body);  // Log the received data

  if (!name || !contact) {
      return res.status(400).json({ message: "Name and contact number are required" });
  }

  try {
      const newTeacher = new Teacher({
          name,
          subject,
          experience,
          location,
          contact,
          bankName,
          accountNumber,
          ifsc,
          previousSchool,
          dob,
          gender,
          maritalsection,
          email,
          qualification,
          currentAddress,
          permanentAddress,
          loginID,
          password,
      });

      await newTeacher.save();
      res.json({ message: "Teacher added successfully" });
  } catch (error) {
      console.error('Error saving teacher:', error);  // Log any errors during saving
      res.status(500).json({ error: "An error occurred while adding the teacher" });
  }
});

// Route to fetch all teachers
app.get("/teacher1", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teacher details:", err);
    res.status(500).send("Failed to fetch teacher details");
  }
});

// Dashboard Route
// Dashboard Route for Gender Ratio
app.get('/dash', async (req, res) => {
  try {
    // Count the number of male, female, and other teachers
    const maleCount = await Teacher.countDocuments({ gender: "Male" });
    const femaleCount = await Teacher.countDocuments({ gender: "Female" });
    const otherCount = await Teacher.countDocuments({ gender: "Other" });

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Teacher Gender Ratio</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <h1>Teacher Gender Ratio</h1>
        <canvas id="genderChart" width="150" height="75"></canvas>

        <script>
          // Gender ratio data from the server
          const genderData = {
            male: ${maleCount},
            female: ${femaleCount},
            other: ${otherCount}
          };

          // Create the chart
          const ctx = document.getElementById('genderChart').getContext('2d');
          new Chart(ctx, {
            type: 'pie', // Pie chart for gender ratio
            data: {
              labels: ['Male', 'Female', 'Other'],
              datasets: [{
                label: 'Teacher Gender Ratio',
                data: [genderData.male, genderData.female, genderData.other],
                backgroundColor: ['blue', 'pink', 'grey']
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Teacher Gender Ratio'
                }
              }
            }
          });
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Error fetching gender data:', err);
    res.status(500).send('Failed to load gender ratio dashboard');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
