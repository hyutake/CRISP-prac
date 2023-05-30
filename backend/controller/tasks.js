const Task = require("../model/task");
const isValidTask = require('../util/validation').isValidTask;

exports.getTasks = (req, res, next) => {
	Task.fetchAll()
		.then((tasks) => {
			console.log("Fetched all tasks!");
			// should probably call some res (response) method... trying out .json cos idk
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

	const task = new Task(title, desc, deadline, null);
	// validation (testing)
	if(!isValidTask(task)) {
		console.log("Invalid task to add!");
		return;
	}
	task
		.save()
		.then((result) => {
			console.log("Added task!");
			const newTaskId = result.insertedId;
			// should probably call some res (response) method... trying out .json cos idk
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

	const updatedTask = new Task(
		updatedTitle,
		updatedDesc,
		updatedDeadline,
		taskId
	);
	// validation (testing)
	if(!isValidTask(updatedTask)) {
		console.log("Invalid task to edit!");
		return;
	}
	updatedTask
		.save()
		.then(() => {
			console.log("Updated task!");
			// should probably call some res (response) method... trying out .json cos idk
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
			// should probably call some res (response) method... trying out .json cos idk
			res.json({ message: "Task data deleted successfully!" });
		})
		.catch((err) => {
			console.log(err);
		});
};
