import { defer, json, useLoaderData, Await } from "react-router-dom";
import TaskRouterForm from "../components/Tasks/TaskRouterForm";
import { Suspense } from "react";

const TaskDetailPage = () => {
	const {task} = useLoaderData();

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Await resolve={task}>
				{(loadedTask) => {
					return <TaskRouterForm task={loadedTask} />
				}}
			</Await>
		</Suspense>
	);
};

export default TaskDetailPage;

async function loadTask(id) {
	const response = await fetch('http://localhost:8080/tasks/' + id);

	if(!response.ok) {
		throw json({message: "Could not retrieve task data"}, {status: 500});
	} else {
		const resData = await response.json();
		return resData.task;
	}
}

export function loader({params}) {
	const taskId = params.taskId;
	return defer({
		task: loadTask(taskId)
	});
	
}
