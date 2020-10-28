import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from '../../../utils/initDb';
import { Account } from '../../../models/Account';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { id: _id, task },
        } = req;
        const { userId } = await getSession({ req });

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!_id) {
            throw new Error('Missing field: _id');
        }
        await connectDb();

        const account = await Account.findOne({ userId });
        const newTodos = account.todos.map((todo) =>
            todo._id === _id ? { ...todo, task } : todo
        );
        account.todos = newTodos;
        const { todos } = await account.save();

        res.status(201).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
