import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [
        {title: "сделать todo list", id:1}
      ],
    idCount: 2  
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            if (action.payload) {
                state.value.push({title: action.payload,
                id: state.idCount
                })
                state.idCount++
            }   
        },
        delProject: (state, action) => {
            state.value = state.value.filter(project => project.id !== action.payload) 
        }
    }
})

export const {addProject, delProject} = projectsSlice.actions
export default projectsSlice.reducer