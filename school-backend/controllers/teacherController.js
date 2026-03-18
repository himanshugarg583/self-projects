const Teacher = require('../models/Teacher');

exports.signupTeacher = async (req, res) => {
  try {
    const { email, teacherName, passWord, gender, mobile, dob, qualification, Address, salary, joiningDate } = req.body;
    const teacherimage = req.file ? req.file.path : '';

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const teacherData = {
      email,
      teacherName,
      passWord, // Plain text mein save hoga
      gender,
      mobile,
      dob,
      qualification,
      Address,
      salary,
      joiningDate,
      teacherimage
    };

    const newTeacher = new Teacher(teacherData);
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher signed up successfully', data: newTeacher });
  } catch (error) {
    res.status(400).json({ message: 'Error signing up teacher', error: error.message });
  }
};

exports.loginTeacher = async (req, res) => {
  try {
    const { email, passWord } = req.body;

    // Teacher find karo email se
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Plain password check karo
    if (teacher.passWord !== passWord) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Success response
    res.status(200).json({ message: 'Login successful', teacher: { email: teacher.email, teacherName: teacher.teacherName } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};