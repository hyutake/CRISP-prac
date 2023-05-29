// router module strictly for the handling of requests relating to Task Objects
const express = require('express');
const taskController = require('../controller/tasks');

const router = express.Router();

router.get('/', taskController.getTasks);

router.post('/add', taskController.postAddTask);

router.post('/edit', taskController.postEditTask);

router.post('/delete', taskController.postDeleteTask);

module.exports = router;