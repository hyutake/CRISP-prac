const Task = require("../model/task");
const isValidTask = require('../util/validation').isValidTask;

exports.getTasks = (req, res, next) => {
	Task.fetchAll()
		.then((tasks) => {
			console.log("Fetched all tasks!");
			res.json({ message: "Task data fetched successfully!",tasks: tasks });
		})
		.catch((err) => {
			console.log(err);
		});
};

// For frontend router implementation
exports.getTaskById = (req, res, next) => {
	const taskId = req.params.id;
	Task.findById(taskId).then(task => {
		console.log("Fetched task by id!");
		res.json({ message:'Task data fetched successfully!', task: task});
	}).catch(err => {
		console.log(err);
	})
}

exports.postAddTask = (req, res, next) => {
	const title = req.body.title;
	const desc = req.body.desc;
	const deadline = req.body.deadline;
	const status = req.body.status;

	const task = new Task(title, desc, deadline, null, status);
	// validation (testing)
	if(!isValidTask(task)) {
		console.log("Unable to add invalid Task object!");
		console.log(task);
		return;
	}
	task
		.save()
		.then((result) => {
			console.log("Added task!");
			const newTaskId = result.insertedId;
			res.status(201).json({ message: "Task data added successfully!", _id: newTaskId });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditTask = (req, res, next) => {
	const taskId = req.body.taskId;
	const updatedTitle = req.body.title;
	const updatedDesc = req.body.desc;
	const updatedDeadline = req.body.deadline;
	const updatedStatus = req.body.status;

	const updatedTask = new Task(
		updatedTitle,
		updatedDesc,
		updatedDeadline,
		taskId,
		updatedStatus
	);
	// validation (testing)
	if(!isValidTask(updatedTask)) {
		console.log("Unable to edit invalid Task object!");
		console.log(updatedTask);
		return;
	}
	updatedTask
		.save()
		.then(() => {
			console.log("Updated task!");
			res.json({ message: "Task updated successfully!", task: updatedTask });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteTask = (req, res, next) => {
	const taskId = req.body.taskId;
	Task.deleteById(taskId)
		.then(() => {
			console.log("Deleted task!");
			res.json({ message: "Task data deleted successfully!" });
		})
		.catch((err) => {
			console.log(err);
		});
};
