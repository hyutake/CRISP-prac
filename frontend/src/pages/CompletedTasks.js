import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import TaskRouterList from "../components/Tasks/TaskRouterList";

const CompletedTasksPage = () => {
    const {tasks} = useLoaderData();
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={tasks}>
                {(loadedTasks) => {
                    const finishedTasks = loadedTasks.filter((task) => task.status === 'Completed');
                    return <TaskRouterList tasks={finishedTasks} label='Completed Tasks' />
                }}
            </Await>
        </Suspense>
    )
}

export default CompletedTasksPage;