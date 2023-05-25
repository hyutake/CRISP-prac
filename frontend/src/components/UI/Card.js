import classes from './Card.module.css';

function Card({className, children}) {
    return (
        <div id='card' className={`${classes.card} ${className}`}>
            {children}
        </div>
    );
}

export default Card;