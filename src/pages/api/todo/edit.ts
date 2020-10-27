import { NextApiResponse, NextApiRequest } from 'next';

import { connectDb } from '../../../utils/initDb';
import { Todo } from '../../../models/Todo';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { id: _id, task },
        } = req;
        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!_id) {
            throw new Error('Missing field: _id');
        }
        await connectDb();
        const todo = await Todo.findOneAndUpdate(
            { _id },
            { task },
            { new: true } /* Return updated object */
        );

        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
