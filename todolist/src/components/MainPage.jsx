import LeftSide from './LeftSide';
import classes from './mainpage.module.css';
import RightSection from './RightSection';
export default function MainPage(){
    return(
        <div className={classes.mainDiv}>
            <LeftSide/>
            <RightSection/>
        </div>
    );
}