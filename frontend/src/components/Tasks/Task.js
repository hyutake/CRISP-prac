import Card from '../UI/Card';
import TaskDeadline from './TaskDeadline';

import classes from './Task.module.css';

function Task(props) {
    // title, desc, deadline
    return (
        <li>
            <Card className={classes['task-item']}>
                <div>
                    <h2>{props.title}</h2>
                    <p className={classes['task-item__description']}>{props.desc}</p>
                </div>
                <TaskDeadline date={props.deadline} />
            </Card>
        </li>
    );
}

export default Task;