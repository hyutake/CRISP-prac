const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class Task {
	constructor(title, desc, deadline, id, status, completedDate) {
		this.title = title;
		this.desc = desc;
		this.deadline = deadline;
		this._id = id; // supposed to be the assigned _id by mongo DB, used to differentiate between add and edit
		this.status = status;
		this.completedDate = completedDate;
	}

	// For both add and edit task
	save() {
		const db = getDB();
		let dbOp;
		if (this._id) {
			// debugging
			console.log("save() edit function triggered!");
			dbOp = db
				.collection("tasks")
				.updateOne(
					{ _id: new ObjectId(this._id) },
					{
						$set: {
							title: this.title,
							desc: this.desc,
							deadline: this.deadline,
							status: this.status,
							completedDate: this.completedDate
						},
					}
				);
		} else {
			// debugging
			console.log("save() add function triggered!");
			dbOp = db.collection("tasks").insertOne(this);
		}
		return dbOp
			.then((result) => {
				// console.log('From task.js (model)');
				console.log(result);
				return result;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// for 'GET'
	static fetchAll() {
		const db = getDB();
		return db
			.collection("tasks")
			.find()
			.toArray()
			.then((tasks) => {
				console.log(tasks);
				return tasks;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// Used for frontend router implementation
	static findById(taskId) {
		const db = getDB();
		return db
			.collection("tasks")
			.findOne({ _id: new ObjectId(taskId) })
			.then((task) => {
				console.log(task);
				return task;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// for 'DELETE'
	static deleteById(taskId) {
		const db = getDB();
		return db
			.collection("tasks")
			.deleteOne({ _id: new ObjectId(taskId) })
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

module.exports = Task;
