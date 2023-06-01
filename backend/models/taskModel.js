const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        id:{
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: [true, "Please enter a task title"]
        },
        description: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        }
    }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
