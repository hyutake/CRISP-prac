import { useState } from "react";

import classes from "./TaskItem.module.css";
import Card from "../UI/Card";
import TaskDeadline from "./TaskDeadline";

import { useDispatch } from "react-redux";
import { taskActions } from "../../store/task-slice";
import { deleteTask } from "../../store/task-actions";

function TaskItem(props) {
	const [showDelete, setShowDelete] = useState(false);
	const dispatch = useDispatch();

	const mouseMoveHandler = (event) => {
		const targetIsCard = event.target.id === 'card';
		if(targetIsCard) {
			const componentRect = event.currentTarget.getBoundingClientRect();
			// where the cursor is relative to the top left of the component (strictly within the component)
			const cursorX = event.clientX - componentRect.left;
			const cursorY = event.clientY - componentRect.top;
	
			const threshold = 30; // Define the threshold(+/- pixels) for being near the top right corner
	
			const cursorAtTopRight =
				cursorX >= componentRect.width - threshold && cursorY <= threshold;
			if (cursorAtTopRight) {
				setShowDelete(true);
			} else {
				setShowDelete(false);
			}
		}
	};
 
	const mouseLeaveHandler = () => {
		setShowDelete(false);
	};

	const deleteTaskHandler = () => {
		const proceed = window.confirm("Delete task?");
		if(proceed) dispatch(deleteTask(props.id));
	};

	const editTaskHandler = () => {

	};

	// title, desc, deadline
	return (
		<li onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler}>
		  <Card className={classes["task-item"]}>
			<TaskDeadline date={props.deadline} />
			<h2>{props.title}</h2>
			<p className={classes["task-item__description"]}>
			  {props.desc}
			</p>
			<div className={classes["actions"]}>
			  {showDelete && (
				<button
				  type="button"
				  onClick={deleteTaskHandler}
				  className={classes["delete-button"]}
				>
				  X
				</button>
			  )}
			  <button
				type="button"
				onClick={editTaskHandler}
				className={classes["edit-button"]}
			  >
				Edit
			  </button>
			</div>
		  </Card>
		</li>
	  );
}

export default TaskItem;
