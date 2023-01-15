import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from "../tasks/Tasks.module.css"
import { changeSubtaskStatus, changeSubtaskState, addSubtask } from './tasksSlice';

const Task = (props) => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const info = state.tasks
    const [visible, setVisible] = useState(false)
    const changeVisible = () => {
        setVisible(!visible)
    }
    const handleChange = useCallback(
        (e) => {
            const { value } = e.target;
            dispatch(changeSubtaskState({ subtask: props.el, value }));
        },
        [dispatch],
    );

    return (
        <div className={classes.task}>
            <div className={classes.task_header}>
                <div className={classes.task__text}>
                    <div className={classes.task__idx}>
                        {props.idx + 1}
                    </div>
                    <div className={classes.task__name}>
                        {props.el.title}
                    </div>
                    <div className={classes.task__descr}>
                        {props.el.description}
                    </div>
                </div>
                <div className={classes.task_status} >
                    <select
                        className={classes.task.select}
                        value={props.el.status}
                        onChange={handleChange}
                        style={{
                            background: props.el.status == 0 ? 'lightcoral'
                                : props.el.status == 1 ? 'rgb(255,255,186)'
                                    : 'lightgreen'
                        }}
                    >
                        <option value="0">в очереди</option>
                        <option value='1'>выполняется</option>
                        <option value="2">выполнено</option>
                    </select>
                </div>
            </div>

            {!visible
                ? <button className={classes.task__more} onClick={() => changeVisible()}>подробнее</button>
                : null
            }
            {visible
                ? <div className={classes.task_flex}>
                    <div className={classes.task_time}>
                        <div className={classes.task_time__section}>
                            <span>Начало задачи: </span>
                            <span>
                                {props.el.dateStart.day}.
                                {props.el.dateStart.month}.
                                {props.el.dateStart.year}
                            </span>
                        </div>
                        <div className={classes.task_time__section}>
                            {props.el.dateEnd.day
                                ? <span>Завершение задачи:
                                    &nbsp;
                                    {props.el.dateEnd.day}.
                                    {props.el.dateEnd.month}.
                                    {props.el.dateEnd.year}
                                </span>
                                : <span>Задача не завершена</span>
                            }
                        </div>
                    </div>
                    <div className={classes.task_subTasks}>
                        {props.el.subtasks.map((ele, idx) =>
                            <div className={classes.subtask} key={idx}>
                                {ele.name}
                                {ele.status == 1
                                    ? <div className={classes.subtask_statusDone} onClick={() => dispatch(changeSubtaskStatus({ payload: props.el, idx }))}></div>
                                    : <div className={classes.subtask_statusNone} onClick={() => dispatch(changeSubtaskStatus({ payload: props.el, idx }))}></div>
                                }
                            </div>
                        )}
                        <div className={classes.subtask} onClick={() => dispatch(addSubtask({ title: prompt(), element: props.el }))}>добавить подзадачу</div>
                    </div>
                </div>
                : null
            }
            {visible
                ? <button className={classes.task__more} onClick={() => changeVisible()}>
                    скрыть
                </button>
                : null
            }
        </div>
    );
};

export default Task