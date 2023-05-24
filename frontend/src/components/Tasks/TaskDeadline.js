import classes from "./TaskDeadline.module.css";
 
function TaskDeadline(props) {
	const date = new Date(props.date);
	const month = date.toLocaleString("en-US", { month: "long" });
	const day = date.toLocaleString("en-US", { day: "2-digit" });
	const year = date.getFullYear();

	return (
		<div className={classes['task-date']}>
			<div className={classes["task-date__month"]}>{month}</div>
			<div className={classes["task-date__day"]}>{day}</div>
			<div className={classes["task-date__year"]}>{year}</div>
		</div>
	);
}

export default TaskDeadline;
