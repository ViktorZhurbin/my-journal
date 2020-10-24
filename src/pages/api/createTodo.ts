import { NextApiResponse, NextApiRequest } from 'next';

import { connectDb } from '../../utils/initDb';
import { Todo } from '../../models/Todo';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { task },
        } = req;

        if (method !== 'POST') {
            throw new Error('Request method must be POST');
        }
        if (!task) {
            throw new Error('Missing field: task');
        }
        await connectDb();
        const todo = await Todo.create({ task });

        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
