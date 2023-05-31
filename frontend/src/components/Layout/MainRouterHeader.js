import classes from './MainHeader.module.css';
import { Link } from 'react-router-dom';
 
function MainRouterHeader() {
    return (
        <header className={classes.header}>
            <Link to='/'><h1>クリスプ</h1></Link>
            <nav>
                <ul className={classes.list}>
                    <li><Link to='/completed'><button type='button'>Completed Tasks</button></Link></li>
                    <li><Link to='/new'><button type='button'>Add Task</button></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainRouterHeader;