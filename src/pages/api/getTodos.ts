import mongoose from 'mongoose';
import { connectDb } from '../../apollo/initDb';

export default async (req, res) => {
    const { method } = req;

    if (method !== 'GET') {
        res.status(400).json({ success: false });
    }

    try {
        await connectDb();
        const todos = mongoose.models.Todo.find({});
        console.log('todos', todos);

        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};
