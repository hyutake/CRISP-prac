import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import MainHeader from "./components/Layout/MainHeader";
//test
function App() {
	const showTaskForm = useSelector((state) => state.ui.showTaskFormModal);

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
