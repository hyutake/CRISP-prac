import classes from "./TaskItem.module.css";
import Card from "../UI/Card";
import TaskDeadline from "./TaskDeadline";


function TaskRouterItem(props) {
	// title, desc, deadline
	return (
		<li>
			<Card className={classes["task-item"]}>
				<div>
					<TaskDeadline status={props.status} deadline={props.deadline} />
				</div>
				<h2>{props.title}</h2>
				<p className={classes["task-item__description"]}>
					{props.desc}
				</p>
			</Card>
		</li>
	);
}

export default TaskRouterItem;
