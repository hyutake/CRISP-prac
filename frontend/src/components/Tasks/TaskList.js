import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";

function TaskList() {
	const [filterTitle, setFilterTitle] = useState("");

	const showCompleted = useSelector((state) => state.ui.showCompleted);
	const tasks = useSelector((state) => state.task.tasks).filter((task) => {
		if(showCompleted) return task.status === 'Completed';
		else return task.status !== 'Completed';
	});

	const filterHandler = (event) => {
		setFilterTitle(event.target.value);
	};

	// Exact string matching to filter out tasks - possible improvements incl. match by first letter or by date (e.g. using the month value)
	const filteredTasks = tasks.filter((task) =>
		task.title.includes(filterTitle)
	);

	return (
		<Fragment>
			<input
				className={classes["task-finder"]}
				onChange={filterHandler}
			/>
			<h2>{showCompleted ? 'Completed Tasks' : 'Incomplete Tasks'}</h2>
			<div className={classes["task-list"]}>
				{filteredTasks.map((task) => (
					<TaskItem
						key={task._id}
						id={task._id}
						title={task.title}
						desc={task.desc}
						deadline={task.deadline}
						status={task.status}
					/>
				))}
			</div>
		</Fragment>
	);
}

export default TaskList;
