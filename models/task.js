const mongoose = require('mongoose');

// Schema (Blueprint) taiyar kar rahe hain
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'], 
        trim: true 
    },
    completed: {
        type: Boolean,
        default: false 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Task', taskSchema);