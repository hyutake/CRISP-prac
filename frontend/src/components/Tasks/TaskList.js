import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";

function TaskList() {
	const [filterTitle, setFilterTitle] = useState("");

  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);

  const filterHandler = (event) => {
	setFilterTitle(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => task.title.includes(filterTitle));

  return (
    <Fragment>
      <input className={classes["task-finder"]} onChange={filterHandler}/>
      <div className={classes["task-list"]}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            desc={task.desc}
            deadline={task.deadline}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default TaskList;
