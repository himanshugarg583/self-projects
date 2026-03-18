const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('teacherimage'), teacherController.signupTeacher);
router.post('/login', teacherController.loginTeacher);

module.exports = router;