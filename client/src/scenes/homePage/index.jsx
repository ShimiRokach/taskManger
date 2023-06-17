import { InputBase, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchTasksQuery, useAddTaskMutation, useUpdateTaskMutation } from '../../store';


const MyComponent = () => {

    const { user } = useSelector((state) => state.auth);

    const { data, error, isFetching } = useFetchTasksQuery(user);
    const [addTask] = useAddTaskMutation();
    const [updateStatus] = useUpdateTaskMutation();
    const [post, setPost] = useState("");


    const handlePost = async () => {
        const task = { taskName: post };
        await addTask({ user, task });
        setPost("");
    };

    const handleStatusChange = async (task) => {
        updateStatus(task);
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
                                borderRadius="10px"
                                padding="1rem"
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Typography >
                                    {task.taskName}
                                </Typography>
                                <Typography onClick={() => handleStatusChange(task)}>
                                    {task.status ? 'DONE' : 'NOT DONE'}
                                </Typography>
                            </Box>
                        )
                    )}
                </>
            )}
        </Box>
    )
};

export default MyComponent;