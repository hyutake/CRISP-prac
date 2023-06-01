import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* 
    tasks: array of task objects -> { title:___, desc:___, deadline:___ }, 'title' & 'desc' are Strings, 'deadline' is a Date object
*/

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
    window.location.reload();
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
    editTask(state, action) {
		
      // action will pass the edited task
      console.log(action.payload);
      const { id, title, description, deadline, completed } = action.payload;
	
      //Make the PUT request to update the task on the backend
      axios.put(`http://localhost:3001/tasks/${id}`, {
        title,
        description,
        deadline,
        completed,
      });
      window.location.reload();
    },
    setTask(state, action) {
	  action.payload.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      state.tasks = action.payload;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
