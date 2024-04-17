const Student = require('../models/studentModel');

exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        console.log(students)
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllStudentsPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalCount = await Student.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const students = await Student.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            students: students
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update student by ID
exports.updateStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete student by ID
exports.deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};