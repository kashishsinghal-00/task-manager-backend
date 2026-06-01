const express = require('express');
const router = express.Router();
const Task = require("../models/task"); 

// 1. CREATE TASK (POST /tasks)
router.post('/tasks', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const newTask = new Task({ title, completed });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. GET ALL TASKS (GET /tasks)
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. UPDATE TASK STATUS (PUT /tasks/:id)
router.put('/tasks/:id', async (req, res) => {
    try {
        const { completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { completed }, 
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task doesnot found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. DELETE TASK (DELETE /tasks/:id)
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task doesnot found" });
        }

        res.status(200).json({ message: "Task is successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;