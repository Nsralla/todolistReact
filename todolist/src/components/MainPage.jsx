import LeftSide from './LeftSide';
import classes from './mainpage.module.css';
import RightSection from './RightSection';
// import Outlet from 'react-router-dom';
import { Outlet } from "react-router-dom";

export default function MainPage(){
    return(
        <div className={classes.mainDiv}>
            <LeftSide/>
            {/* <RightSection/> */}
            <Outlet/>
        </div>
    );
}