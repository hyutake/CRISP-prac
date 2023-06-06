const express = require('express');

const tasksController = require('../controller/tasks-controller');

const router = express.Router();

router.get('/:tid', tasksController.getTaskById);

router.post('/', tasksController.addTask);

router.delete('/', tasksController.deleteTask);

router.get('/', tasksController.fetchTasks);

module.exports = router;
