const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/', studentController.getAllStudentsPagination);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudentById);
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;