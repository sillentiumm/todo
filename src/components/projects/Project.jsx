import React from "react";
import { useDispatch } from "react-redux";
import classes from '../projects/projects.module.css'
import { delProject } from "./projectsSlice";
import { filter } from "../tasks/tasksSlice";


const Project = (props) => {

    const dispatch = useDispatch()

    return (
    <div>
     <div className={classes.project} >
         <div className={classes.project__idx}>{props.idx + 1}</div>
         <div className={classes.project__title} onClick={() => dispatch(filter(props.el))} >{props.el.title}</div>
         <button className={classes.project__del} onClick={()=> dispatch(delProject(props.el.id))} >удалить</button>
     </div>
    </div>
);
};

export default Project