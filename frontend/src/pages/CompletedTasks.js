import TaskRouterList from "../components/Tasks/TaskRouterList";

const CompletedTasksPage = () => {
    return (
        <TaskRouterList completed={true} />
    )
}

export default CompletedTasksPage;