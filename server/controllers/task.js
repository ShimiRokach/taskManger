import Task from "../models/Task.js";

/* READ */
export const getTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/* CREATE */
export const createTask = async (req, res) => {
    try {
        const { userId, taskName } = req.body;
        const newTask = new Task({
            userId,
            taskName
        });
        await newTask.save();

        const tasks = await Task.find({ userId });
        res.status(201).json(tasks);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* UPDATE */
export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { status: !task.status } },
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

