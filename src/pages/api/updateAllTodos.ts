import { connectDb } from '../../utils/initDb';
import { Todo } from '../../models/Todo';

export default async (req, res) => {
    const {
        method,
        body: { updatedTodos },
    } = req;

    if (method !== 'POST') {
        throw new Error('Request method must be POST');
    }

    if (!updatedTodos) {
        throw new Error('Missing field: updatedTodos');
    }

    try {
        await connectDb();
        await Todo.deleteMany({});
        const newTodos = await Todo.insertMany(updatedTodos);

        res.status(201).json({ success: true, data: newTodos });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};
