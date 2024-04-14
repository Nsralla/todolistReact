import classes from '../components/rightsection.module.css';
import PropTypes from 'prop-types'; // Step 1: Import PropTypes

export default function Span({handleColorType, color, functional}){
    return (
        <span style={{cursor:'pointer'}}
            onClick={()=>{handleColorType(color,functional)}}
            className={`${classes.statusdot} ${classes[color]}`}>
        </span>
    );
}

Span.propTypes = {
    handleColorType: PropTypes.func.isRequired, // Indicating that a function is required
    color: PropTypes.string.isRequired, // Indicating that a string is required
    functional: PropTypes.string.isRequired // Indicating that a string is required
};