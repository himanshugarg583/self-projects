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

// Define the Student schema and model
const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  admissionNo: { type: String, required: true },
  grade: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  motherContact: { type: Number, required: true },
  fatherContact: { type: Number, required: true },
  emergencyContact: { type: Number, required: true },
  motherqualification: { type: String, required: true },
  fatherqualification: { type: String, required: true },
  email: { type: String, required: true },
});




const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the ERP Backend! Navigate to /add-student or /student1 for specific functionality.");
});


// Route to render the student form
app.get("/add-student", (req, res) => {
    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student Form</title>
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
            flex-direction: column;
            min-height: 100vh;
            box-sizing: border-box;
        }

        /* Header Style */
        .header {
            width: 100%;
            background-color: #333;
            color: white;
            padding: 20px 0;
            text-align: center;
        }

        .header .logo-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
        }

        .header .logo-container img {
            height: 50px;
            border-radius: 50%;
        }

        .header h1 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .header p {
            margin: 0;
            font-size: 0.9rem;
        }

        .header .contact-info {
            font-size: 0.8rem;
            margin-top: 10px;
        }

        /* Main Form Style */
        .container {
            width: 100%;
            max-width: 800px;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            animation: fadeIn 1s ease-in-out;
            margin-top: 20px;
            box-sizing: border-box; /* Prevents overflow due to padding */
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
            padding: 14px 16px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: all 0.3s ease;
            width: 100%;
            margin-bottom: 10px;
            box-sizing: border-box; /* Ensures padding is included in width */
        }

        input:focus, select:focus, textarea:focus {
            border-color: #4CAF50;
            outline: none;
        }

        button {
            padding: 14px 24px;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%;
            box-sizing: border-box; /* Prevents overflow due to padding */
        }

        button:hover {
            background-color: #45a049;
        }

        .form-section {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .gender-radio, .marital-status-radio {
            display: flex;
            gap: 15px;
        }

        /* Animations */
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        /* Footer Style */
        .footer {
            width: 100%;
            background-color: #333;
            color: white;
            padding: 15px;
            text-align: center;
            margin-top: 20px;
        }

        .footer p {
            margin: 0;
            font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 20px;
                width: 90%;
            }

            h2 {
                font-size: 1.5rem;
            }

            button {
                font-size: 14px;
            }

            .form-section h3 {
                font-size: 1.1rem;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 15px;
            }

            h2 {
                font-size: 1.2rem;
            }

            button {
                font-size: 12px;
            }

            .form-section h3 {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>

    <!-- Header -->
    <div class="header">
        <div class="logo-container">
            <div class="text-center">
                <h1>Maheshwari Public School</h1>
                <p>Affiliated to CBSE, Delhi</p>
                <div class="contact-info">
                    <p>Email: mpskijaipur@gmail.com</p>
                    <p>Contact: +91 9876543210, +91 7412949000</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Form Container -->
    <div class="container">
        <h2>Add Student Form</h2>
        <form id="studentForm" method="POST" action="/add-student" onsubmit="submitStudentForm(event); return false;">
            <!-- Personal Details -->
            <div class="form-section">
                <h3>Personal Details</h3>
                <label for="studentName">Name:</label>
                <input type="text" id="studentName" name="studentName" required>

                <label for="fatherName">Father's Name:</label>
                <input type="text" id="fatherName" name="fatherName" required>

                <label for="motherName">Mother's Name:</label>
                <input type="text" id="motherName" name="motherName" required>

                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required>

                <label for="gender">Gender:</label>
                <div class="gender-radio" id="gender">
                    <label><input type="radio" name="gender" value="Male" required> Male</label>
                    <label><input type="radio" name="gender" value="Female"> Female</label>
                    <label><input type="radio" name="gender" value="Other"> Other</label>
                </div>
            </div>

            <!-- Address -->
            <div class="form-section">
                <h3>Address</h3>
                <label for="currentAddress">Current Address:</label>
                <input type="text" id="currentAddress" name="currentAddress" required>

                <label for="permanentAddress">Permanent Address:</label>
                <input type="text" id="permanentAddress" name="permanentAddress" required>
            </div>

            <!-- School and Admission Details -->
            <div class="form-section">
                <h3>School and Admission Details</h3>
                <label for="admissionNo">Admission Number:</label>
                <input type="text" id="admissionNo" name="admissionNo" required>

                <label for="grade">Grade/Year:</label>
                <input type="text" id="grade" name="grade" required>

                <label for="medicalHistory">Medical History:</label>
                <textarea id="medicalHistory" name="medicalHistory" rows="4" required></textarea>
            </div>

            <!-- Contact Details -->
            <div class="form-section">
                <h3>Contact Details</h3>
                <label for="motherContact">Mother Contact Number:</label>
                <input type="number" id="motherContact" name="motherContact" required>

                <label for="fatherContact">Father Contact Number:</label>
                <input type="number" id="fatherContact" name="fatherContact" required>

                <label for="emergencyContact">Emergency Number:</label>
                <input type="number" id="emergencyContact" name="emergencyContact" required>

            </div>


            <div class="form-section">
                <h3>Qualification</h3>
                <label for="motherqualification">Mother Qualification:</label>
                <input type="text" id="motherqualification" name="motherqualification" required>

                <label for="fatherqualification">Father Qualification:</label>
                <input type="text" id="fatherqualification" name="fatherqualification" required>

                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>&copy; 2025 MPS School. All rights reserved.</p>
    </div>

    <script>
        function submitStudentForm(event) {
            event.preventDefault();
            const form = document.getElementById('studentForm');
            const formData = new FormData(form);

            const studentData = {};
            formData.forEach((value, key) => {
                studentData[key] = value;
            });
            console.log(studentData);

            fetch('http://localhost:3000/add-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Student added successfully') {
                    alert('Student added successfully');
                    form.reset();
                } else {
                    alert('Failed to add student');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding student');
            });
        }
    </script>

</body>
</html>
  
    `);
  });
  
// Route to handle form submission
app.post("/add-student", async (req, res) => {
  const {
      studentName,
      fatherName,
      motherName,
      dob,
      gender,
      currentAddress,
      permanentAddress,
      admissionNo,
      grade,
      medicalHistory,
      motherContact,
      fatherContact,
      emergencyContact,
      motherqualification,
      fatherqualification,
      email,
  } = req.body;

  console.log("Received data:", req.body);  // Log the received data

  if (!studentName || !fatherContact || !motherContact) {
    return res.status(400).json({ message: "Name and contact numbers are required" });
}


  try {
      const newStudent = new Student({
          studentName,
          motherName,
          fatherName,
          dob,
          gender,
          currentAddress,
          permanentAddress,
          admissionNo,
          grade,
          medicalHistory,
          motherContact,
          fatherContact,
          emergencyContact,
          motherqualification,
          fatherqualification,
          email,
      });

      await newStudent.save();
      res.json({ message: "Student added successfully" });
  } catch (error) {
      console.error('Error saving student:', error);  // Log any errors during saving
      res.status(500).json({ error: "An error occurred while adding the student" });
  }
});

// Route to fetch all students
app.get("/student1", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students details:", err);
    res.status(500).send("Failed to fetch students details");
  }
});

// Dashboard Route
// Dashboard Route for Gender Ratio
// Dashboard Route for Gender Ratio and Admissions by Grade
app.get('/students_dash', async (req, res) => {
    try {
      // Count the number of male, female, and other students
      const maleCount = await Student.countDocuments({ gender: "Male" });
      const femaleCount = await Student.countDocuments({ gender: "Female" });
      const otherCount = await Student.countDocuments({ gender: "Other" });
  
      // Get count of students for each grade
      const gradeCounts = await Student.aggregate([
        {
          $group: {
            _id: "$grade", // Group by grade
            count: { $sum: 1 } // Count the number of students in each grade
          }
        },
        {
          $sort: { _id: 1 } // Sort grades alphabetically or numerically
        }
      ]);
  
      // Extract grade labels and counts for the bar chart
      const gradeLabels = gradeCounts.map(grade => grade._id);
      const gradeData = gradeCounts.map(grade => grade.count);
  
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Students Dashboard</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
          <h1>Students Dashboard</h1>
  
          <!-- Gender Ratio Chart -->
          <h2>Gender Ratio</h2>
          <canvas id="genderChart" width="150" height="75"></canvas>
  
          <!-- Admissions by Grade Chart -->
          <h2>Admissions by Grade</h2>
          <canvas id="gradeChart" width="150" height="75"></canvas>
  
          <script>
            // Gender ratio data from the server
            const genderData = {
              male: ${maleCount},
              female: ${femaleCount},
              other: ${otherCount}
            };
  
            // Admissions by grade data from the server
            const gradeData = {
              labels: ${JSON.stringify(gradeLabels)},
              counts: ${JSON.stringify(gradeData)}
            };
  
            // Create the gender ratio pie chart
            const genderCtx = document.getElementById('genderChart').getContext('2d');
            new Chart(genderCtx, {
              type: 'pie',
              data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                  label: 'Gender Ratio',
                  data: [genderData.male, genderData.female, genderData.other],
                  backgroundColor: ['blue', 'pink', 'grey']
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Student Gender Ratio' }
                }
              }
            });
  
            // Create the admissions by grade bar chart
            const gradeCtx = document.getElementById('gradeChart').getContext('2d');
            new Chart(gradeCtx, {
              type: 'bar',
              data: {
                labels: gradeData.labels,
                datasets: [{
                  label: 'Number of Admissions',
                  data: gradeData.counts,
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Admissions by Grade' }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Students' }
                  },
                  x: {
                    title: { display: true, text: 'Grade' }
                  }
                }
              }
            });
          </script>
        </body>
        </html>
      `);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Failed to load dashboard');
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
