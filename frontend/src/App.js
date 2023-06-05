import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTaskData } from "./store/task-actions";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import MainHeader from "./components/Layout/MainHeader";

// Router implementation 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import TasksPage, {loader as tasksLoader} from './pages/Tasks';
import TaskDetailPage, { loader as taskDetailLoader } from "./pages/TaskDetail";
import NewTaskPage from "./pages/NewTask";
import {action as manipulateTaskAction} from './components/Tasks/TaskRouterForm';
import CompletedTasksPage from "./pages/CompletedTasks";

const router = createBrowserRouter([
	{ path: '/', element: <RootLayout />, errorElement: <ErrorPage /> , children: [
		{ index: true, id: 'tasks', element: <TasksPage />, loader: tasksLoader },
		{ path: '/:taskId', element: <TaskDetailPage />, loader: taskDetailLoader, action: manipulateTaskAction },
		{ path: '/new', element: <NewTaskPage />, action: manipulateTaskAction },
		{ path: '/completed', element: <CompletedTasksPage />, loader: tasksLoader }
	] }
])
 
export const RouterApp = () => {
	return <RouterProvider router={router} />
}
 
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
