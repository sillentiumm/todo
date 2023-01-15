// import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from '../components/projects/projectsSlice'
import tasksReducer from '../components/tasks/tasksSlice'

// export const store = configureStore({
//     reducer: {
//         projects: projectsReducer,
//         tasks:tasksReducer
//     }
// })
// export default store


import { createStore, combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})


export const persistor = persistStore(store)
export default store
