import mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
});
