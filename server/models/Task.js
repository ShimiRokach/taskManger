import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        userId: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
