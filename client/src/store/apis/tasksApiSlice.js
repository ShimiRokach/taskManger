import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tasksApiSlice = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/tasks',

    }),
    endpoints(builder) {
        return {
            fetchTasks: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result?.map((task) => {
                        return { type: 'Task', id: task._id };
                    }) ?? [];
                    tags?.push({ type: 'UserTasks', id: user._id });
                    return tags;
                },
                query: (user) => {
                    return {
                        url: `/${user._id}`,
                        method: 'GET'
                    };
                }
            }),

            addTask: builder.mutation({
                invalidatesTags: (result, error, { user, task }) => {
                    return [{ type: 'UserTasks', id: user._id }];
                },
                query: ({ user, task }) => {
                    return {
                        url: '/',
                        method: 'POST',
                        body: {
                            userId: user._id,
                            taskName: task.taskName
                        }
                    };
                }
            }),

            updateTask: builder.mutation({
                invalidatesTags: (result, error, task) => {
                    return [{ type: 'Task', id: task._id }];
                },
                query: (task) => {
                    return {
                        url: `/${task._id}`,
                        method: 'PUT'
                    };
                }
            }),

            deleteTask: builder.mutation({
                invalidatesTags: (result, error, task) => {
                    return [{ type: 'Task', id: task._id }];
                },
                query: (task) => {
                    return {
                        url: `/${task._id}`,
                        method: 'DELETE'
                    };
                }
            })
        };
    }
});

export const {
    useFetchTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApiSlice;
export { tasksApiSlice };
