import classes from './MainHeader.module.css';

import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
 
function MainHeader() {
    const dispatch = useDispatch();

    const addTaskHandler = () => {
        dispatch(uiActions.showAddTaskForm());
    }

    return (
        <header className={classes.header}>
            <h1>CRISP</h1>
            <nav>
                <ul className={classes.list}>
                    <li><button type='button' onClick={addTaskHandler}>Add Task</button></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;