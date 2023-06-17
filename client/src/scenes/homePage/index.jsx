import { InputBase, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../../store';


const MyComponent = () => {

    const { user } = useSelector((state) => state.auth);

    const { data, isFetching } = useFetchTasksQuery(user);
    const [addTask] = useAddTaskMutation();
    const [updateStatus] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [post, setPost] = useState("");


    const handlePost = async () => {
        const task = { taskName: post };
        await addTask({ user, task });
        setPost("");
    };

    const handleStatusChange = async (task) => {
        updateStatus(task);
    };

    const handleDelete = async (task) => {
        deleteTask(task);
    };

    return (
        <Box
            width="40%"
            padding="2rem 6%"
            display="block"
            gap="0.5rem"
            justifyContent="space-between"
        >
            <InputBase
                placeholder="Please enter a task"
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                }}
            />

            <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                    borderRadius: "3rem",
                }}
            >
                Add Task
            </Button >

            {isFetching ? (
                <p>Loading...</p>
            ) : (

                <>
                    {data?.map(
                        (task) => (
                            <Box
                                key={task._id}
                                border="1px solid #ccc"
                                padding="1rem"
                                display="grid"
                                gridTemplateColumns="3fr 1fr 1fr"
                            >
                                <Typography >
                                    {task.taskName}
                                </Typography>
                                <Button
                                    onClick={() => handleStatusChange(task)}
                                    sx={{
                                        justifyContent: "flex-start"
                                    }}>
                                    {task.status ? 'DONE' : 'NOT DONE'}
                                </Button>
                                <Button
                                    onClick={() => handleDelete(task)}
                                    sx={{
                                        color: "red"
                                    }}
                                >
                                    DELETE
                                </Button >
                            </Box>
                        )
                    )}
                </>
            )}
        </Box>
    )
};

export default MyComponent;