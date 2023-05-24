import Modal from '../UI/Modal';
import classes from "./TaskForm.module.css";

function TaskForm({onHide, task}) {
	function submitHandler(event) {
		event.preventDefault();
	}

	return (
		<Modal onHide={onHide}>
			<form onSubmit={submitHandler}>
				<div className={classes.form}>
					<p>
						<label htmlFor="title">Title</label>
						<input
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
							id="deadline"
							type="date"
							name="deadline"
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
