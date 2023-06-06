import { taskActions } from "./task-slice";

const url = "http://localhost:5000/api/tasks"

export const fetchTasks = () => {
    return async (dispatch) => {
        const response = await fetch(url);

        const data = await response.json();
        console.log("fetchTasks in task-actions: \n", data);
        dispatch(taskActions.overwriteTasks(data));
    };
};

export const addTask = (task) => {
    console.log(task);
    return async (dispatch) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                deadline: task.deadline
            })
        });

        const data = await response.json();
        console.log(data);
        dispatch(taskActions.addTask({
            _id: data._id,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
        }));
    }
}

export const deleteTask = (id) => {
    return async (dispatch) => {
        const deleteData = async () => {

            const response = await fetch(url, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: id
                })
            });
    
            const data = await response.json();
            return data;
        }
        const resData = await deleteData();

        dispatch(taskActions.removeTask(id));
    }
}