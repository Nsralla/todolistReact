import classes from './leftside.module.css';
import image from '../assets/profile.jpg';
import { Link } from 'react-router-dom';
export default function LeftSide(){
    return(
        <section className={classes.mainSection} >

            <div className={classes.firstDiv}>
                <img className={classes.image} src={image} alt="profile image" />
                <div className={classes.details}>
                    <h2>Do-it </h2>
                    <p>Nsralla Hassan</p>
                </div>
                <br/>
            </div>
            <span className={classes.firstSpan}></span>

            
            <div>
                <h2 style={{color:'#f39f5a', cursor:'pointer'}}><i style={{paddingRight:'6px'}} className="fa-solid fa-list-check"></i>
                        Today todos
                </h2>
                <ul>
                    <li>
                        <span className={`${classes.statusdot} ${classes.blue}`}></span>
                        <Link to='/blue' style={{textAlign:'center', padding:'0', margin:'0', paddingLeft:'4px',  cursor:'pointer', textDecoration:'none'}}>personal</Link>
                    </li>

                    <li>
                        <span className={`${classes.statusdot} ${classes.green}`}></span>
                        <Link to="/green" style={{textAlign:'center', padding:'0', margin:'0', paddingLeft:'4px',  cursor:'pointer', textDecoration:'none'}}>Freelance</Link>
                    </li>

                    <li>
                        <span className={`${classes.statusdot} ${classes.yellow}`}></span>
                        <Link to='/yellow' style={{textAlign:'center', padding:'0', margin:'0', paddingLeft:'4px',  cursor:'pointer', textDecoration:'none'}}>Work</Link>
                    </li>
                </ul>
            </div>


            <div>
                <Link to="/addTodo" style={{color:'#f39f5a', cursor:'pointer'}}> <i style={{paddingRight:'6px'}} className="fa-solid fa-calendar-days"></i>Schedule task</Link>
            </div>
        </section>
    );
}