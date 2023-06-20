import { taskActions } from "./task-slice";
import { SERVER_URL } from "../util/config";

// Backend is listening on port 8080 (for now)
const url = `${SERVER_URL}/tasks`;

// get request
export const fetchTaskData = () => {
	return async (dispatch) => {
		// declare fetchData function
		const fetchData = async () => {
			const response = await fetch(url);
			// if response is NOT ok (some error occurred)
			if (!response.ok) {
				throw new Error("Could not fetch task data!");
			}

			const data = await response.json();
			return data;
		};

		// try-catch block to call fetchData() 
		try {
			// resData will be an Object that contains a 'tasks' and a 'message' attribute
			// 'tasks' will be an array of Task objects returned by the backend
			// 'message' is just a string to display a successful event in the console
			const resData = await fetchData();
			dispatch(
				taskActions.replaceTasks({
					tasks: resData.tasks || [],
				})
			);
			console.log(resData.message);
		} catch (err) {
			console.log(err);
		}
	};
};

// add request
export const addTaskData = (task) => {
	return async (dispatch) => {
		// declare addData function
		const addData = async () => {
			const response = await fetch(url + "/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: task.title,
					desc: task.desc,
					deadline: task.deadline,
					status: task.status,
					completedDate: task.completedDate
				}),
			});

			if (!response.ok) {
				throw new Error("Could not send task data!");
			}

			const data = await response.json();
			return data;
		};

		try {
			// resData will be an Object that contains a '_id' and a 'message' attribute
			// '_id' will be an ObjectId Object - i.e., the assigned _id by mongodb
			// 'message' is just a string to display a successful event in the console
		    const resData = await addData();
			const taskId = resData._id;
			// trying out dispatching frontend update from here instead
			dispatch(taskActions.addTask({
				_id: taskId,
				title: task.title,
				desc: task.desc,
				deadline: task.deadline,
				status: task.status,
				completedDate: task.completedDate
			}));
			console.log(resData.message);
		} catch (err) {
			console.log(err);
		}
	};
};

// edit request
export const editTaskData = (task) => {
	return async (dispatch) => {
		// declare editData() function
		const editData = async () => {
			const response = await fetch(url + "/edit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					taskId: task._id,
					title: task.title,
					desc: task.desc,
					deadline: task.deadline,
					status: task.status,
					completedDate: task.completedDate
				}),
			});

			if (!response.ok) {
				throw new Error("Could not send task data!");
			}

			const data = await response.json();
			return data;
		};

		try {
			// resData will be an Object that contains a 'task' and a 'message' attribute
			// 'task' will be the UPDATED Task object
			// 'message' is just a string to display a successful event in the console
			const resData = await editData();

			// local edit
			dispatch(taskActions.editTask(task));

			console.log(resData.message);
		} catch (err) {
			console.log(err);
		}
	};
};

// delete request
export const deleteTaskData = (id) => {
	return async (dispatch) => {
		// declare deleteData() function
		const deleteData = async () => {
			const response = await fetch(url + "/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					taskId: id
				}),
			});

			if (!response.ok) {
				throw new Error("Could not delete task data!");
			}

			const data = await response.json();
			return data;
		};

		try {
			// resData will be an Object that contains a 'message' attribute
			// 'message' is just a string to display a successful event in the console
			const resData = await deleteData();
			// local delete
			dispatch(taskActions.removeTask(id));
			console.log(resData.message);
		} catch (err) {
			console.log(err);
		}
	};
};
