import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
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

const todoModel = mongoose.model('todoModel', todoSchema);

export { todoModel };
