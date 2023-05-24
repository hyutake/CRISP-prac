import classes from './MainHeader.module.css';
 
function MainHeader({onAddTask}) {
    return (
        <header className={classes.header}>
            <h1>MainHeader</h1>
            <nav>
                <ul className={classes.list}>
                    <li><button type='button' onClick={onAddTask}>Add Task</button></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;