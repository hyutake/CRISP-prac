import { useState, Fragment } from "react";
import classes from "./TaskList.module.css";
import TaskRouterItem from "./TaskRouterItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskRouterList(props) {
	const [filterTitle, setFilterTitle] = useState("");
	// Get the relevant tasks from redux context
	const tasks = useSelector(state => state.task.tasks).filter((task) => {
		if(props.completed) {
			return task.status === 'Completed';
		} else {
			return task.status !== 'Completed';
		}
	});

	// Assign the label
	const label = props.completed ? 'Completed Tasks' : 'Incomplete Tasks'

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
				placeholder="Search for a task here"
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
							completedDate={task.completedDate}
						/>
					</Link>
				))}
			</div>
		</Fragment>
	);
}

export default TaskRouterList;
