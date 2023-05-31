import { Await, json, useLoaderData, defer } from "react-router-dom";
import TaskRouterList from '../components/Tasks/TaskRouterList';
import { Suspense } from "react";

const TasksPage = () => {
    const {tasks} = useLoaderData();
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={tasks}>
                {(loadedTasks) => {
                    const unfinishedTasks = loadedTasks.filter((task => task.status !== 'Completed'))
                    return <TaskRouterList tasks={unfinishedTasks} />
                }}
            </Await>
        </Suspense>
    )
}

export default TasksPage;

async function loadTasks() {
    const response = await fetch('http://localhost:8080/tasks');

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