import classes from './MainHeader.module.css';
import { Link } from 'react-router-dom';
 
function MainRouterHeader() {
    return (
        <header className={classes.header}>
            <h1>CRISP</h1>
            <nav>
                <ul className={classes.list}>
                    <li><Link to='/new'><button type='button'>Add Task</button></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainRouterHeader;