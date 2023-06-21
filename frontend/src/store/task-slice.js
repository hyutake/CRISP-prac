import { createSlice } from "@reduxjs/toolkit";

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
      //push the task to the object array(?) of tasks
      state.tasks.push({
        _id: task._id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
      });
      state.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    },
    removeTask(state, action) {
      // action will pass the id of a task
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },
    editTask(state, action) {
      // action will pass the edited task
      const editedTask = action.payload;
      // Find the index of the task with the matching _id in the state.tasks array
      const task = state.tasks.find((task) => task._id === editedTask.id);
      if (task !== null) {
        // Update the task properties with the new values from the payload
        task.title = editedTask.title;
        task.description = editedTask.description;
        task.deadline = editedTask.deadline;
        task.completed = editedTask.completed;
      }
      state.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    },
    setTask(state, action) {
      state.tasks = action.payload;
      state.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    },
  },
});

export const taskStateActions = taskSlice.actions;
export default taskSlice;
