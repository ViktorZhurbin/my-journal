import mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
});

export const Todo = mongoose.models?.Todo || mongoose.model('Todo', TodoSchema);
