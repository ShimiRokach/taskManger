import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import { usersApiSlice } from './apis/usersApiSlice';
import { tasksApiSlice } from './apis/tasksApiSlice';


export const store = configureStore({
    reducer: {
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
        [tasksApiSlice.reducerPath]: tasksApiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApiSlice.middleware)
            .concat(tasksApiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export {
    useLoginMutation,
    useRegisterMutation
} from './apis/usersApiSlice';
export {
    useFetchTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation
} from './apis/tasksApiSlice';