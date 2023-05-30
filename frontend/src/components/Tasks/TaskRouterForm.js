import { useDispatch } from "react-redux";
import { deleteTaskData } from "../../store/task-actions";
import Modal from "../UI/Modal";
import classes from "./TaskForm.module.css";
import { Form, json, redirect, useNavigate } from "react-router-dom";

function TaskRouterForm({ task }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onHide() {
        navigate('..');
    }

    function deleteTaskHandler() {
        const proceed = window.confirm("Delete task?");

        if(proceed) dispatch(deleteTaskData(task._id));

        onHide();
    }

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
							required
						/>
					</p>
				</div>
				<div className={classes.actions}>
					<button type="button" onClick={task ? deleteTaskHandler : onHide}>
						{task ? 'Delete Task' : 'Cancel'}
					</button>
					<button>{task ? "Update task" : "Add task"}</button>
				</div>
			</Form>
		</Modal>
	);
}

export default TaskRouterForm;

export const action = async ({request, params}) => {
	const taskId = params.taskId || null;
    // console.log("taskId in TaskRouterForm action():" + taskId);
	// get the submitted values
    const formData = await request.formData();
    const task = {
        title: formData.get('title'),
        desc: formData.get('desc'),
        deadline: formData.get('deadline'),
        taskId: taskId
    }

	// perform checks
	if (
		task.title.trim().length === 0 ||
		task.desc.trim().length === 0 ||
		task.deadline.trim().length === 0
	) {
		// report error (somehow), prolly by changing the styles
		return;
	}
    // debugging
	// console.log(task);

    const route = taskId ? 'edit' : 'add';
	let url = 'http://localhost:8080/tasks/' + route;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(task)
    })

    if(!response.ok) {
        throw json({message: 'Could not send form data'}, {status: 500});
    }

	return redirect('/');
};
