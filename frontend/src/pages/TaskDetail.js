import { defer, json, useLoaderData, Await } from "react-router-dom";
import TaskRouterForm from "../components/Tasks/TaskRouterForm";
import { Suspense } from "react";
import { SERVER_URL } from "../util/config";

const TaskDetailPage = () => {
	const {task} = useLoaderData();

	return (
		<Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
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
	const response = await fetch(`${SERVER_URL}/tasks/${id}`);

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
