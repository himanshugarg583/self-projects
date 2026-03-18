const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  teacherName: { type: String, required: true },
  passWord: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  dob: { type: String, required: true },
  qualification: { type: String, required: true },
  Address: { type: String, required: true },
  salary: { type: String, required: true },
  joiningDate: { type: String, required: true },
  teacherimage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);