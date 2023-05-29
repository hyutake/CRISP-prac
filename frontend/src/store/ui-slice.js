import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
    name: 'ui',
    initialState: { showTaskFormModal: false, task: null },
    reducers: {
        showAddTaskForm(state) {
            state.showTaskFormModal = true;
        },
        showEditTaskForm(state, action) {
            const taskToEdit = action.payload;
            state.showTaskFormModal = true;
            state.task = {
                _id: taskToEdit._id,
                title: taskToEdit.title,
                desc: taskToEdit.desc,
                deadline: taskToEdit.deadline
            };
        },
        hideTaskForm(state) {
            state.showTaskFormModal = false;
            state.task = null;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;