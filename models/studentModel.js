const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    rollnum: String,
    age: Number,
    section: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;