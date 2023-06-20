import { useDispatch } from "react-redux";
import { deleteTaskData, editTaskData } from "../../store/task-actions";
import Modal from "../UI/Modal";
import classes from "./TaskForm.module.css";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import { SERVER_URL } from "../../util/config";

function TaskRouterForm({ task }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const taskIsCompleted = task && task.status === 'Completed';

	function onHide() {
		// temp. solution - because I'm reusing this form to display tasks in both the 'completed' and 'incomplete' list,
		// the routing logic to display this form has to be "the same", i.e. the same url format should link to the displaying of the form
		// BUT, the "origin", i.e. where the user was BEFORE, is different ('/' vs '/completed'), so this is the only way I know how to do this
		
		if(taskIsCompleted) {
			navigate('/completed');
		} else navigate("..");
	}

	function deleteTaskHandler() {
		const proceed = window.confirm("Delete task?");

		if (proceed) dispatch(deleteTaskData(task._id));

		onHide();
	}

	function completeTaskHandler() {
		const proceed = window.confirm("Resolve task?");

		const today = new Date();
		const formattedToday = today.toISOString().split('T')[0];

		if (proceed)
			dispatch(
				editTaskData({
					title: task.title,
					desc: task.desc,
					deadline: task.deadline,
					_id: task._id,
					status: "Completed",
					completedDate: formattedToday,
				})
			);

		onHide();
	}

	function addEditHandler() {
		// button onClick() function seems(?) to exec first, and THEN the form submission triggers
		// Problem: for adding of tasks, I need the generated _id from mongodb first before I update the context
		//			Meaning that I need to update the context AFTER sending the request to the backend
		console.log('testing addEditHandler()');
		// update redux context here...?
		// if(task) {
		// 	dispatch(editTaskData({
		// 		title: task.title,
		// 		desc: task.desc,
		// 		deadline: task.deadline,
		// 		_id: task._id,
		// 		status: task.status,
		// 		completedDate: task.completedDate,
		// 	}))
		// } else {
		// 	dispatch(addTaskData({
		// 		title: task.title,
		// 		desc: task.desc,
		// 		deadline: task.deadline,
		// 		status: task.status,
		// 		completedDate: task.completedDate
		// 	}))
		// }
		// onHide()
	}

	// If task is marked as "Completed", don't provide any button options
	const buttonDisplay = (!taskIsCompleted &&
		<div className={classes.actions}>
			<button
				type="button"
				name="delete"
				onClick={task ? deleteTaskHandler : onHide}
			>
				{task ? "Delete Task" : "Cancel"}
				<FaTimes className={classes["cancel-icon"]} />
			</button>
			<button onClick={addEditHandler}>{task ? "Update task" : "Add task"}</button>
			{task && (
				<button
					type="button"
					name="complete"
					onClick={completeTaskHandler}
				>
					Complete Task
					<FaCheck className={classes["check-icon"]} />
				</button>
			)}
		</div>
	);

	return (
		<Modal onHide={onHide}>
			<Form method="post">
				<div className={classes.form}>
					<p>
						<label htmlFor="title">Title</label>
						<input
							id="title"
							type="text"
							name="title"
							placeholder="Insert title here..."
							defaultValue={task ? task.title : ""}
							readOnly={taskIsCompleted}
							required
						/>
					</p>
					<p>
						<label htmlFor="desc">Description</label>
						<textarea
							id="desc"
							type="text"
							rows="5"
							name="desc"
							placeholder="Insert description here..."
							defaultValue={task ? task.desc : ""}
							readOnly={taskIsCompleted}
							required
						/>
					</p>
					<p>
						<label htmlFor="deadline">Deadline</label>
						<input
							id="deadline"
							type="date"
							name="deadline"
							min="2023-05-01"
							max="2023-12-15"
							defaultValue={task ? task.deadline : ""}
							readOnly={taskIsCompleted}
							required
						/>
					</p>
					{task && task.completedDate && <p>
						<label htmlFor="completedDate">Date of Completion</label>
						<input
							id="completedDate"
							type="date"
							name="completedDate"
							min="2023-05-01"
							max="2023-12-15"
							defaultValue={task.completedDate}
							readOnly
							required
						/>
					</p>}
				</div>
				{buttonDisplay}
			</Form>
		</Modal>
	);
}

export default TaskRouterForm;

export const action = async ({ request, params }) => {
	console.log('Add/Edit form submission');
	const taskId = params.taskId || null;
	// console.log("taskId in TaskRouterForm action():" + taskId);
	// get the submitted values
	const formData = await request.formData();
	const task = {
		title: formData.get("title"),
		desc: formData.get("desc"),
		deadline: formData.get("deadline"),
		taskId: taskId,
		status: "In progress",
		completedDate: null
	};

	// perform checks
	if (
		task.title.trim().length === 0 ||
		task.desc.trim().length === 0 ||
		task.deadline.trim().length === 0
	) {
		// report error (somehow), prolly by changing the styles?
		return;
	}

	// "configure" the route and send request
	const route = taskId ? "edit" : "add";
	let url = `${SERVER_URL}/tasks/${route}`;
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});

	// check response
	if (!response.ok) {
		throw json({ message: "Could not send form data" }, { status: 500 });
	}

	return redirect("/");
};
