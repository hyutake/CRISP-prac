import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTaskData } from "./store/task-actions";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import MainHeader from "./components/Layout/MainHeader";
//test
function App() {
	const showTaskForm = useSelector((state) => state.ui.showTaskFormModal);
	const dispatch = useDispatch();

	// fetch the data at the start
	useEffect(() => {
		dispatch(fetchTaskData());
	}, [dispatch]);

	return (
		<Fragment>
			<MainHeader />
			{showTaskForm && (
				<TaskForm />
			)}
			<main>
				<TaskList />
			</main>
		</Fragment>
	);
}

export default App;
