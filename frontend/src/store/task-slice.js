import { createSlice } from "@reduxjs/toolkit";

// to remove later
const DUMMY_TASKS = [
	{
		id: "t1",
		title: "Laundry",
		desc: "Do laundry",
		deadline: "2023-05-27"
	},
	{
		id: "t2",
		title: "Workout",
		desc: "Go to the gym",
		deadline: "2023-05-29"
	},
	{
		id: "t3",
		title: "Lorem Ipsum",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus eros fermentum arcu eleifend porttitor. Ut accumsan dui at maximus rutrum. Quisque tristique maximus pretium. Ut tristique a diam ut luctus. Donec auctor, ante a dictum hendrerit, enim massa pretium massa, vel sagittis diam ligula sed nibh. Donec efficitur turpis sed dolor imperdiet blandit. Vivamus imperdiet elit et felis faucibus mollis. Suspendisse mollis dolor ornare lacus faucibus semper. Proin tempor enim nisl. Curabitur elementum, justo sit amet suscipit tincidunt, sapien eros fringilla sapien, vitae pharetra nunc ipsum eu odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla pulvinar venenatis erat, nec vulputate tellus.",
		deadline: "2023-06-22"
	},
]
/* 
    tasks: array of task objects -> { title:___, desc:___, deadline:___ }, 'title' & 'desc' are Strings, 'deadline' is a Date object
*/
const initialTaskState = {
	tasks: DUMMY_TASKS,
	quantity: 0,
};

const taskSlice = createSlice({
	name: "task",
	initialState: initialTaskState,
	reducers: {
		addTask(state, action) {
			// action will pass an entire task object
            const task = action.payload;

			state.tasks.push({
                id: 't' + Math.random().toString(),
                title: task.title,
                desc: task.desc,
                deadline: task.deadline
            });
			state.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
			state.quantity++;
		},
		removeTask(state, action) {
			// action will pass the id of a task
            const id = action.payload;

			// double confirm deletion
			const proceed = window.confirm("Delete task?");

			if(proceed) {
				state.tasks = state.tasks.filter((task) => task.id !== id);
				state.quantity--;
			}
		},
		editTask(state, action){
			// action will pass the edited task
			const editedTask = action.payload;
			console.log("editedTask.id:");
			console.log(editedTask.id);
			
			// find the matching task stored in the redux context
			const existingTask = state.tasks.find((task) => task.id === editedTask.id);

			if(!existingTask) {
				console.log("Task does not exist wtf?");
			}

			// update values...?
			existingTask.title = editedTask.title;
			existingTask.desc = editedTask.desc;
			existingTask.deadline = editedTask.deadline;
		}  
	},
});

export const taskActions = taskSlice.actions;
export default taskSlice;
