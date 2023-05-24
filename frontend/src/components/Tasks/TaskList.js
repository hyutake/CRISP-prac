import { useState } from "react";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";

const DUMMY_TASKS = [
	{
		id: "t1",
		title: "Laundry",
		desc: "Do laundry",
		deadline: new Date("2023-05-27T12:30:00"),
	},
	{
		id: "t2",
		title: "Workout",
		desc: "Go to the gym",
		deadline: new Date("2023-05-29T17:30:00"),
	},
	{
		id: "t3",
		title: "Lorem Ipsum",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus eros fermentum arcu eleifend porttitor. Ut accumsan dui at maximus rutrum. Quisque tristique maximus pretium. Ut tristique a diam ut luctus. Donec auctor, ante a dictum hendrerit, enim massa pretium massa, vel sagittis diam ligula sed nibh. Donec efficitur turpis sed dolor imperdiet blandit. Vivamus imperdiet elit et felis faucibus mollis. Suspendisse mollis dolor ornare lacus faucibus semper. Proin tempor enim nisl. Curabitur elementum, justo sit amet suscipit tincidunt, sapien eros fringilla sapien, vitae pharetra nunc ipsum eu odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla pulvinar venenatis erat, nec vulputate tellus.",
		deadline: new Date("2023-06-22T09:30:00"),
	},
];

function TaskList({ tasks }) {
	const [displayTasks, setDisplayTasks] = useState(DUMMY_TASKS);

	const deleteTaskHandler = (id) => {
		setDisplayTasks((oldTasks) => {
			return oldTasks.filter((task) => task.id !== id);
		});
	};

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
					onDeleteTask={deleteTaskHandler}
				/>
			))}
		</div>
	);
}

export default TaskList;
