const express = require('express');
const mongoose = require('mongoose');
const { server, app, io } = require('./socket/socket'); 
const router = require('./router/index');
const messageRouter = require('./router/message');
const userRouter = require('./router/user');
const cors = require('cors');
const path = require('path');

const port = 5000;

// Connect to the database
mongoose.connect(
  "mongodb+srv://aakashkandel:Aakash12345@nodejs.mqjxskr.mongodb.net/akchatapp?retryWrites=true&w=majority&appName=nodejs",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Database Connected Successfully");
}).catch((error) => {
  console.error("Unable to connect to Database", error);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname, 'akchatapp', 'build'))); // Adjust path based on your build folder structure

// Routes
app.use('/api', router);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);
app.use('/uploads', express.static('uploads'));

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'akchatapp', 'build', 'index.html'));
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
