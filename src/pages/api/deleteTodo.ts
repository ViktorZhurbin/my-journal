import mongoose from 'mongoose';
import { connectDb } from '../../utils/initDb';
import { Todo } from '../../models/Todo';

export default async (req, res) => {
    const {
        method,
        body,
        body: { id: _id },
    } = req;

    if (method !== 'DELETE') {
        throw new Error('Request method must be DELETE');
    }

    if (!_id) {
        throw new Error('Missing field: _id');
    }

    try {
        await connectDb();
        const result = await Todo.deleteOne({ _id });

        if (result?.deletedCount !== 1) {
            throw new Error('Unable to delete task');
        }

        res.status(201).json({ success: true, data: { _id } });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};
