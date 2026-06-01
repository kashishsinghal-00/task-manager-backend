require('dotenv').config();
const express = require('express');
const expressapp = express();
const mongoose = require('mongoose'); 
const taskRoutes = require('./routes/taskRoutes');
expressapp.use(express.json());
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Database Connected Successfully"))
.catch((err) => console.log("Database Connection Error: ", err));

expressapp.use('/', taskRoutes);
expressapp.get('/', (req, res) => {
    res.send("Working of backend server and database is absolutely fine");
});

const PORT = process.env.PORT ;
expressapp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

