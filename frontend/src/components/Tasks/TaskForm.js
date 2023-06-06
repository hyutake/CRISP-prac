import { useDispatch } from 'react-redux';
import { taskActions } from '../../store/task-slice';
import { useRef } from 'react';
import Modal from '../UI/Modal';
import classes from "./TaskForm.module.css";
import { addTask } from '../../store/task-actions';

function TaskForm({onHide, task}) {
	const dispatch = useDispatch();

	// I forgor whats the best way to perform input validation :/
	const titleRef = useRef();
	const descRef = useRef();
	const deadlineRef = useRef();

	function submitHandler(event) {
		event.preventDefault();
		
		// get the submitted values
		const enteredTitle = titleRef.current.value;
		const enteredDesc = descRef.current.value;
		const enteredDeadline = deadlineRef.current.value;

		// perform checks
		if(enteredTitle.trim().length === 0 || enteredDesc.trim().length === 0 || enteredDeadline.trim().length === 0) {
			// report error (somehow), prolly by changing the styles
			return;
		}

		dispatch(addTask({
			title: enteredTitle,
			description: enteredDesc,
			deadline: enteredDeadline
		}));

		console.log("task dispatched")
	}

	return (
		<Modal onHide={onHide}>
			<form onSubmit={submitHandler}>
				<div className={classes.form}>
					<p>
						<label htmlFor="title">Title</label>
						<input
							ref={titleRef}
							id="title"
							type="text"
							name="title"
							placeholder="Insert title here..."
                            defaultValue={task ? task.title : ''}
							required
						/>
					</p>
					<p>
						<label htmlFor="desc">Description</label>
						<textarea
							ref={descRef}
							id="desc"
							type="text"
							rows="5"
							name="desc"
							placeholder="Insert description here..."
                            defaultValue={task ? task.desc : ''}
							required
						/>
					</p>
					<p>
						<label htmlFor="deadline">Deadline</label>
						<input
							ref={deadlineRef}
							id="deadline"
							type="date"
							name="deadline"
							min="2023-05-01"
							max="2023-12-15"
                            defaultValue={task ? task.deadline : ''}
							required
						/>
					</p>
				</div>
				<div className={classes.actions}>
                    <button type='button' onClick={onHide}>Cancel</button>
					<button>{task ? 'Update task' : 'Add task'}</button>
				</div>
			</form>
		</Modal>
	);
}

export default TaskForm;
