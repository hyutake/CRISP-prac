import { Await, json, useLoaderData, defer } from "react-router-dom";
import TaskRouterList from '../components/Tasks/TaskRouterList';
import { Suspense } from "react";
import { SERVER_URL } from "../util/config";
import { useDispatch } from "react-redux";
import { taskActions } from "../store/task-slice";

const TasksPage = () => {
    const {tasks} = useLoaderData();
    const dispatch = useDispatch();
	
    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={tasks}>
                {(loadedTasks) => {
                    dispatch(taskActions.replaceTasks({tasks: loadedTasks}));
                    return <TaskRouterList completed={false} />
                }}
            </Await>
        </Suspense>
    )
}

export default TasksPage;

async function loadTasks() {
    const response = await fetch(`${SERVER_URL}/tasks`);

    if(!response.ok) {
        throw json({message: 'Could not fetch tasks!'}, {status: 500});
    } else {
        const resData = await response.json();
        return resData.tasks;
    }
}

export function loader() {
    return defer({
        tasks: loadTasks()
    });
}