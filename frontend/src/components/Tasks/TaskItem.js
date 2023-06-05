import { useState } from "react";

import classes from "./TaskItem.module.css";
import Card from "../UI/Card";
import TaskDeadline from "./TaskDeadline";

import { useDispatch } from "react-redux";
import { deleteTaskData, editTaskData } from "../../store/task-actions";
import { uiActions } from "../../store/ui-slice";
import { Cancel, CheckCircle } from "@mui/icons-material";

function TaskItem(props) {
	const [showTaskUpdateOptions, setShowTaskUpdateOptions] = useState(false);
	const dispatch = useDispatch();

	const taskIsCompleted = props.status === "Completed";

	const mouseMoveHandler = (event) => {
		const targetIsCard = event.target.id === "card";
		if (targetIsCard) {
			const componentRect = event.currentTarget.getBoundingClientRect();
			// where the cursor is relative to the top left of the component (strictly within the component)
			const cursorX = event.clientX - componentRect.left;
			const cursorY = event.clientY - componentRect.top;

			// Define the threshold(+/- pixels) for being near the top right corner
			// x & y are defined separately because the revealed 'component' is rectangular (horizontally so)
			const xThreshold = 60;
			const yThreshold = 30;

			const cursorAtTopRight =
				cursorX >= componentRect.width - xThreshold &&
				cursorY <= yThreshold;
			if (cursorAtTopRight) {
				setShowTaskUpdateOptions(true);
			} else {
				setShowTaskUpdateOptions(false);
			}
		}
	};

	const mouseLeaveHandler = () => {
		setShowTaskUpdateOptions(false);
	};

	const deleteTaskHandler = () => {
		// double confirm deletion
		const proceed = window.confirm("Delete task?");

		// backend delete (also calls local delete)
		if (proceed) dispatch(deleteTaskData(props.id));
	};

	const completeTaskHandler = () => {
		// double confirm completion
		const proceed = window.confirm("Complete task?");

		// update status
		if (proceed)
			dispatch(
				editTaskData({
					_id: props.id,
					title: props.title,
					desc: props.desc,
					deadline: props.deadline,
					status: "Completed",
				})
			);
	};

	const editTaskHandler = () => {
		const curTask = {
			_id: props.id,
			title: props.title,
			desc: props.desc,
			deadline: props.deadline,
			status: props.status,
		};
		dispatch(uiActions.showEditTaskForm(curTask));
	};

	const buttonDisplay = !taskIsCompleted && (
		<div className={classes["actions"]}>
			{showTaskUpdateOptions && (
				<div>
					<button
						type="button"
						onClick={completeTaskHandler}
						className={classes["complete-btn"]}
					>
						<CheckCircle />
					</button>
					<button
						type="button"
						onClick={deleteTaskHandler}
						className={classes["delete-btn"]}
					>
						<Cancel />
					</button>
				</div>
			)}
			<button
				type="button"
				onClick={editTaskHandler}
				className={classes["edit-btn"]}
			>
				Edit
			</button>
		</div>
	);

	// title, desc, deadline
	return (
		<li onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler}>
			<Card className={classes["task-item"]}>
				<TaskDeadline status={props.status} deadline={props.deadline} />
				<h2>{props.title}</h2>
				<p className={classes["task-item__description"]}>
					{props.desc}
				</p>
				{buttonDisplay}
			</Card>
		</li>
	);
}

export default TaskItem;
