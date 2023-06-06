import { useState, Fragment } from "react";
import classes from "./TaskList.module.css";
import TaskRouterItem from "./TaskRouterItem";
import { Link } from "react-router-dom";

function TaskRouterList(props) {
	const [filterTitle, setFilterTitle] = useState("");

	// Sort tasks by deadline
	const tasks = props.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

	const filterHandler = (event) => {
		setFilterTitle(event.target.value);
	};
  
	// Exact string matching to filter out tasks
	const filteredTasks = tasks.filter((task) =>
		task.title.includes(filterTitle)
	);

	return (
		<Fragment>
			<input
				className={classes["task-finder"]}
				onChange={filterHandler}
			/> 
			<h2>{props.label}</h2>
			<div className={classes["task-list"]}>
				{filteredTasks.map((task) => (
					<Link key={task._id} to={`/${task._id}`}>
						<TaskRouterItem
							id={task._id}
							title={task.title}
							desc={task.desc}
							deadline={task.deadline}
							status={task.status}
							completedDate={task.completedDate}
						/>
					</Link>
				))}
			</div>
		</Fragment>
	);
}

export default TaskRouterList;
