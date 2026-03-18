const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  admissionNo: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  class: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  aadharNo: { type: String, required: true, unique: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherPhone: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherEmail: { type: String, required: true },
  currentAddress: { type: String, required: true },
  previousSchool: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);