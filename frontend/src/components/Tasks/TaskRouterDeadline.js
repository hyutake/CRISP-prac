import classes from "./TaskDeadline.module.css";
import { Tooltip } from "@mui/material";

function TaskRouterDeadline(props) {
	const today = new Date();
	const date = new Date(props.deadline);

	function convertMilliToDays(ms) {
		// ms -> sec -> min -> hour -> day
		return Math.round(ms / (1000 * 60 * 60 * 24));
	}

	// customising color + tooltip based on deadline
	const isOverdueBy = convertMilliToDays(date - today);
	// default status and statusToolTip are the set values for Completed Tasks
	let status = '';
	let statusToolTip = 'Completed!';
	if (props.status !== "Completed") {
		status = classes["task-date__todo"];
		statusToolTip = `Task due in ${isOverdueBy} day(s)!`;
		if (isOverdueBy === 0) {
			status = classes["task-date__due"];
			statusToolTip = `Task due today!!`;
		} else if (isOverdueBy < 0) {
			status = classes["task-date__overdue"];
			statusToolTip = `Task overdue by ${Math.abs(
				isOverdueBy
			)} day(s)!!!`;
		}
	}

	const month = date.toLocaleString("en-US", { month: "long" });
	const day = date.toLocaleString("en-US", { day: "2-digit" });
	const year = date.getFullYear();

	return (
		<Tooltip title={statusToolTip}>
			<div className={`${classes["task-date"]} ${status}`}>
				<div className={classes["task-date__month"]}>{month}</div>
				<div className={classes["task-date__day"]}>{day}</div>
				<div className={classes["task-date__year"]}>{year}</div>
			</div>
		</Tooltip>
	);
}

export default TaskRouterDeadline;
