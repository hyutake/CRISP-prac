import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";

function TaskList() {
	const displayTasks = useSelector((state) => state.task.tasks);

	return (
		<div className={classes["task-list"]}>
			{/* {tasks.map(task => <Task title={task.title} desc={task.desc} deadline={task.deadline} />)} */}
			{displayTasks.map((task) => (
				<TaskItem
					key={task.id}
					id={task.id}
					title={task.title}
					desc={task.desc}
					deadline={task.deadline}
				/>
			))}
		</div>
	);
}

export default TaskList;
