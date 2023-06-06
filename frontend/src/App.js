import { useDispatch } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import MainHeader from "./components/Layout/MainHeader";
import { fetchTasks } from "./store/task-actions";
//test
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
	const dispatch = useDispatch();

  useEffect(() => {
	dispatch(fetchTasks());
  }, [])

  const showAddTaskModal = () => {
    setShowAddTask(true);
  }

  const hideAddTaskModal = () => {
    setShowAddTask(false);
  }

	return (
		<Fragment>
			<MainHeader onAddTask={showAddTaskModal} />
			{showAddTask && <TaskForm onHide={hideAddTaskModal} />}
			<main>
				<TaskList />
			</main>
		</Fragment>
	);
}

export default App;
