import { NextApiResponse, NextApiRequest } from 'next';

import { connectDb } from '../../utils/initDb';
import { Todo } from '../../models/Todo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { method } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        await connectDb();
        const todos = await Todo.find({});

        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
