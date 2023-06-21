const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/taskModel');
const cors = require('cors');
//const {fetchTasks} = require('../frontend/src/store/task-slice');
//const store = require('../frontend/src/store/index');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Node API!');
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    //console.log(req.body);
    const task = new Task(req.body); // Create a new instance of the Task model with the request body
    //console.log("From server.js:");
    await task.save()
    //console.log("Task: " + task);
    //console.log
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put('/tasks/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const updatedTask = req.body;
  
      const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
  app.delete('/tasks/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
  
      // Find the task by ID and remove it from the database
      const deletedTask = await Task.findByIdAndRemove(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

// ... other routes (PUT, DELETE) ...

mongoose
  .connect('mongodb+srv://Ashioklord:jIIVZ2p8swbJV4lm@mattapi.rgdtxua.mongodb.net/Node-API?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3001, () => {
      console.log('Node API app is running on port 3001');
    });
  })
  .catch((error) => {
    console.log(error);
  });
