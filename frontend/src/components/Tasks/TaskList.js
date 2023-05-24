import TaskItem from './TaskItem';
import classes from './TaskList.module.css';

const DUMMY_TASKS = [
    { id: 't1', title: "Laundry", desc: 'Do laundry', deadline: new Date('2023-05-27T12:30:00') },
    { id: 't2', title: "Workout", desc: 'Go to the gym', deadline: new Date('2023-05-29T17:30:00') },
    { id: 't3', title: "Electrical", desc: 'Sussy', deadline: new Date('2023-06-22T09:30:00') },
]

function TaskList({ tasks }) {
    const displayTasks = tasks ? tasks : DUMMY_TASKS;

    return (
        <div className={classes['task-list']}>
            {/* {tasks.map(task => <Task title={task.title} desc={task.desc} deadline={task.deadline} />)} */}
            {displayTasks.map(task => <TaskItem key={task.id} title={task.title} desc={task.desc} deadline={task.deadline} />)}
        </div>
    );
}

export default TaskList;