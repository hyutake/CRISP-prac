const Task = require("../model/tasks");

// const DUMMY_TASKS = [
//     {
//         id: 't1',
//         title: 'Finish project',
//         description: 'Project damn big',
//     }
// ]

exports.getTaskById = (req, res, next) => {
  const taskId = req.params.tid;

  const task = DUMMY_TASKS.find((t) => {
    return t.id === taskId;
  });

  res.json({ task });
};

exports.editTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;

  const updatedTask = new Task(title, description, deadline);

  updatedTask.save().then(() => {
    res.status(201).json(updatedTask);
  });
};

exports.addTask = (req, res, next) => {
    console.log(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;

  const newTask = new Task({
    title: title,
    description: description,
    deadline: deadline
  });

  newTask.save().then(() => {
    res.status(201).json(newTask);
  });
};

exports.deleteTask = (req, res, next) => {
    console.log(req.body);
    console.log(req.body.id);
    Task.findByIdAndDelete(req.body.id).then((result) => {
        res.status(201);
    })
}

exports.fetchTasks = (req, res, next) => {
  Task.find().then((tasks) => {
    console.log(tasks);
    res.status(201).json(tasks);
  });
};
