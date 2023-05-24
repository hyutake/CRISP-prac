import classes from './MainHeader.module.css';

function MainHeader() {
    return (
        <header className={classes.header}>
            <h1>MainHeader</h1>
            <nav>
                <ul>
                    <li>Tasks</li>
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;