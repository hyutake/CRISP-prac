import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { showTaskFormModal: false, task: null },
  reducers: {
    showAddTaskForm(state) {
      state.showTaskFormModal = true;
    },
    showEditTaskForm(state, action) {
      const taskToEdit = action.payload;
      state.showTaskFormModal = true;
      const deadlineDate = new Date(taskToEdit.deadline);
      const formattedDeadline = deadlineDate.toISOString().split("T")[0];

      state.task = {
        id: taskToEdit.id,
        title: taskToEdit.title,
        desc: taskToEdit.desc,
        deadline: formattedDeadline,
      };
    },
    hideTaskForm(state) {
      state.showTaskFormModal = false;
      state.task = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
