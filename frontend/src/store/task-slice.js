import { createSlice } from "@reduxjs/toolkit";

/* 
    tasks: array of task objects -> { title:___, desc:___, deadline:___ }, 'title' & 'desc' are Strings, 'deadline' is a Date object
*/
const initialTaskState = {
	tasks: [
		{
			id: "t1",
			title: "Laundry",
			desc: "Do laundry",
			deadline: new Date("2023-05-27T12:30:00").toISOString(),
		},
		{
			id: "t2",
			title: "Workout",
			desc: "Go to the gym",
			deadline: new Date("2023-05-29T17:30:00").toISOString(),
		},
		{
			id: "t3",
			title: "Lorem Ipsum",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus eros fermentum arcu eleifend porttitor. Ut accumsan dui at maximus rutrum. Quisque tristique maximus pretium. Ut tristique a diam ut luctus. Donec auctor, ante a dictum hendrerit, enim massa pretium massa, vel sagittis diam ligula sed nibh. Donec efficitur turpis sed dolor imperdiet blandit. Vivamus imperdiet elit et felis faucibus mollis. Suspendisse mollis dolor ornare lacus faucibus semper. Proin tempor enim nisl. Curabitur elementum, justo sit amet suscipit tincidunt, sapien eros fringilla sapien, vitae pharetra nunc ipsum eu odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla pulvinar venenatis erat, nec vulputate tellus.",
			deadline: new Date("2023-06-22T09:30:00").toISOString(),
		},
	],
	quantity: 0,
};

const taskSlice = createSlice({
	name: "task",
	initialState: initialTaskState,
	reducers: {
		addTask(state, action) {
			// action will pass an entire task object
            const task = action.payload;

			state.tasks.push(task);
			state.quantity++;
		},
		removeTask(state, action) {
			// action will pass the id of a task
            const id = action.payload;

			state.tasks = state.tasks.filter((task) => task.id !== id);
			state.quantity--;
		},
	},
});

export const taskActions = taskSlice.actions;
export default taskSlice;
