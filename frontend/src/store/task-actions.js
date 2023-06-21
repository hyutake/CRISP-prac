import axios from "axios";
import { taskStateActions } from "./task-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      //fetch the tasks from backend
      const response = await axios.get("http://localhost:3001/tasks");
      if (response.status === 200) {
        const tasks = response.data;
        return tasks;
      } else {
        throw new Error("Failed to fetch/update tasks from the API.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTask = (newTask) => {
  return async (dispatch) => {
    //send the new task to the backend
    await axios.post("http://localhost:3001/tasks", {
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
    });
    //fetch the whole task list
    const tasks = await dispatch(fetchTasks());
    //find that specific task
    const newTaskWithId = tasks.find(
      (task) =>
        task.title === newTask.title && task.description === newTask.description
    );
    //add the task to the frontend
    dispatch(taskStateActions.addTask(newTaskWithId));
  };
};

export const deleteTask = (id) => {
  return async () => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
  };
};

export const editTask = (editedTask) => {
  return async (dispatch) => {
    const { id, title, description, deadline, completed } = editedTask;
    //updates that specific task on backend
    axios.put(`http://localhost:3001/tasks/${id}`, {
      title,
      description,
      deadline,
      completed,
    });
    //updates on frontend
    dispatch(taskStateActions.editTask(editedTask));
  };
};

export const useInitTasks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTasksAndInitialize = async () => {
      try {
        //dispatch fetch tasks, which fetches and initializes frontend
        dispatch(fetchTasks())
          .then((tasks) => {
            dispatch(taskStateActions.setTask(tasks));
          })
          .catch((error) => {
            // Handle error if any
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasksAndInitialize();
  }, [dispatch]);
};
