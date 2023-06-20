import { createSlice } from "@reduxjs/toolkit";

/* 
    tasks: array of task objects -> { _id:___, title:___, desc:___, deadline:___, status:___, completedDate:___ }, 
	'title' & 'desc' are Strings
	'deadline' & 'completedDate' are Date objects
	'status' is also a String, but only so to allow for >2 statuses in the future if needed (not sure if enums are a thing in js)
	'_id' is the auto-generated identifier created by MongoDB
*/
const initialTaskState = {
	tasks: [],
};

const taskSlice = createSlice({
	name: "task",
	initialState: initialTaskState,
	reducers: {
		addTask(state, action) {
			// action will pass an entire task object
            const task = action.payload;

			state.tasks.push({
				_id: task._id,
                title: task.title,
                desc: task.desc,
                deadline: task.deadline,
				status: 'In progress',	// newly added tasks will ALWAYS be 'In progress'
				completedDate: null		// newly added tasks will not have a completedDate value yet
            });
			state.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
		},
		removeTask(state, action) {
			// action will pass the id of a task
            const id = action.payload;
			// filter out the task
			state.tasks = state.tasks.filter((task) => task._id !== id);
		},
		editTask(state, action){
			// action will pass the edited task
			const editedTask = action.payload;

			console.log(editedTask);
			
			// find the matching task stored in the redux context 
			const existingTask = state.tasks.find((task) => task._id === editedTask._id);

			if(!existingTask) {
				console.log("Task does not exist or using RouterApp!");
			}

			// update values
			existingTask.title = editedTask.title;
			existingTask.desc = editedTask.desc;
			existingTask.deadline = editedTask.deadline;
			existingTask.status = editedTask.status ? editedTask.status : 'In progress';
			existingTask.completedDate = editedTask.completedDate ? editedTask.completedDate : null;
		},
		replaceTasks(state, action) {
			state.tasks = action.payload.tasks;
			state.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
		}
	},
});

export const taskActions = taskSlice.actions;
export default taskSlice;
