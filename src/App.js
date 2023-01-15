import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Projects from './components/projects/Projects';
import Tasks from './components/tasks/Tasks';
import './App.css';



function App() {

  const state = useSelector(state => state)

  return (
    <div className="App">
      <div className='container'>
        <Projects/>
      </div>        
        <hr/>  
      <div className='container'>
        {state.tasks.projectInfo.id 
          ? <div> <Tasks/> </div>
          : <div className='chooseProject'> Выберите проект </div>
        }
      </div> 
    </div>
  );
}

export default App;
