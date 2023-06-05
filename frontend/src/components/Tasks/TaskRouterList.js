import { useState, Fragment } from "react";
import classes from "./TaskList.module.css";
import TaskRouterItem from "./TaskRouterItem";
import { Link } from "react-router-dom";

function TaskRouterList({tasks, label}) {
	const [filterTitle, setFilterTitle] = useState("");

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
			<h2>{label}</h2>
			<div className={classes["task-list"]}>
				{filteredTasks.map((task) => (
					<Link key={task._id} to={`/${task._id}`}>
						<TaskRouterItem
							id={task._id}
							title={task.title}
							desc={task.desc}
							deadline={task.deadline}
							status={task.status}
						/>
					</Link>
				))}
			</div>
		</Fragment>
	);
}

export default TaskRouterList;
