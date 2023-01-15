import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../tasks/Task';
import classes from "./Tasks.module.css"
import { addTask, sort } from './tasksSlice';



const Tasks = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()  

  const tasks = state.tasks.tasks
  const projectInfo = state.tasks.projectInfo  
  const visibleTasks = tasks.filter((task => task.projectId === projectInfo.id))

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(sort( value));
    },
    [dispatch],
  );


  return (
    <div className={classes.tasks}>
      <div className={classes.task__title}> {projectInfo.title} </div>
      {visibleTasks.length > 1
        ? <div className={classes.task_sort} >
            <span>сортировка по: </span>
            <select onChange={handleChange}>
              <option value="0">статусу</option>
              <option value='1'>названию</option>
            </select>
          </div>
        : null
      }
      {visibleTasks.map((el,idx) =>
        <Task key = {el.id} el={el} idx={idx} /> 
      )}
      <div className={classes.task__new} onClick={()=> dispatch(addTask(prompt())) } >добавить задачу</div>
    </div>
  );
};

export default Tasks