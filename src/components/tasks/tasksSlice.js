import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {
            id: 1, projectId: 1, title: "внутрення часть", status: 2,
            subtasks: [{ name: "добавление проектов/задач", status: true }, { name: "сортировка", status: true }, { name: "реализовать даты", status: true }],
            dateStart: { year: 2022, month: 12, day: 21 }, dateEnd: { year: 2022, month: 12, day: 26 }
        },
        {
            id: 2, projectId: 1, title: "оформление", status: 1,
            subtasks: [{ name: "навести красоту", status: false }, { name: "добавить анимации", status: false }, { name: "подобрать цвета статусов", status: true }],
            dateStart: { year: 2022, month: 12, day: 23 }, dateEnd: { year: '', month: '', day: '' }
        },
    ],
    projectInfo: { title: '', id: 0 },
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        filter: (state, action) => {
            state.projectInfo = { title: action.payload.title, id: action.payload.id }
        },
        addTask: (state, action) => {
            const start = new Date();
            const yearStart = start.getFullYear()
            const monthStart = start.getMonth() + 1;
            const dayStart = start.getDate();
            if (action.payload) {
                state.tasks.push({
                    id: state.tasks.length + 1,
                    projectId: state.projectInfo.id,
                    title: action.payload,
                    subtasks: [],
                    status: 0,
                    dateStart: { year: yearStart, month: monthStart, day: dayStart },
                    dateEnd: { year: '', month: '', day: '' },
                })
            }
        },
        addSubtask: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.element.id)
            state.tasks[taskIndex].subtasks.push({ name: action.payload.title, status: false })
        },
        sort: (state, action) => {
            action.payload == 1 ?
                state.tasks.sort((a, b) => a.title > b.title ? 1 : -1)
                : state.tasks.sort((a, b) => a.status < b.status ? 1 : -1)
        },
        changeSubtaskStatus: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.payload.id)
            const subtasksIndex = action.payload.idx
            state.tasks[taskIndex].subtasks[subtasksIndex].status = !state.tasks[taskIndex].subtasks[subtasksIndex].status
        },
        changeSubtaskState: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.subtask.id)
            state.tasks[taskIndex].status = action.payload.value

            const end = new Date()
            const yearEnd = end.getFullYear()
            const monthEnd = end.getMonth() + 1;
            const dayEnd = end.getDate();
            if (action.payload.value == 2) {
                state.tasks[taskIndex].dateEnd = { year: yearEnd, month: monthEnd, day: dayEnd }
            }
        }
    }
})

export const {
    filter,
    addTask,
    addSubtask,
    sort,
    changeSubtaskStatus,
    changeSubtaskState,
} = tasksSlice.actions
export default tasksSlice.reducer