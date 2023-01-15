import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from './projectsSlice'; 
import classes from './projects.module.css'
import Project from '../projects/Project';


const Projects = () => {

    const projects = useSelector((state) => state.projects.value)

    const dispatch = useDispatch()

   return (
       <div>
         <div className={classes.projects}> 
            {projects.map((el,idx) => 
                <Project key={idx}  el={el} idx={idx}/>
            )} 
             <div className={classes.project__add} onClick={() => dispatch(addProject(prompt()))}>
                добавить проект
            </div>
         </div>
       </div>
   );
};

export default Projects