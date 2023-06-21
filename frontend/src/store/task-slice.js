import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useFetchTasks, { fetchTasks, useInitTasks } from "./useFetchTasks";
const initialTaskState = {
  tasks: [],
  //quantity: 0,
};

const taskSlice = createSlice({
	
  name: "task",
  initialState: initialTaskState,
  reducers: {
    addTask(state, action) {
      // action will pass an entire task object
		const task = action.payload;
      axios
        .post("http://localhost:3001/tasks", {
          title: task.title,
          description: task.description,
          deadline: task.deadline,
        })
    },
    removeTask(state, action) {
      // action will pass the id of a task
      const id = action.payload;

      // double confirm deletion
      const proceed = window.confirm("Delete task?");

      if (proceed) {
        state.tasks = state.tasks.filter((task) => task._id !== id);
        axios.delete(`http://localhost:3001/tasks/${id}`);
      }
    },
    async editTask(state, action) { 
      //dispatch can be taken in as arg
      // action will pass the edited task
      console.log(action.payload);
      const { id, title, description, deadline, completed } = action.payload;
	
      //Make the PUT request to update the task on the backend
      await axios.put(`http://localhost:3001/tasks/${id}`, {
        title,
        description,
        deadline,
        completed,
      });
      //fetchTasks
      //setTasks

      //refactor into another event, 
      //have another actions file
      
    },
    setTask(state, action) {
	  //action.payload.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      while (state.tasks != action.payload){
        state.tasks = action.payload;
      }
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
