import { NextApiResponse, NextApiRequest } from 'next';

import { connectDb } from '../../../utils/initDb';
import { Todo } from '../../../models/Todo';
import { ITodo } from '@/modules/todo/@types';
type Data = {
    success: boolean;
    data?: ITodo;
    error?: string;
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
): Promise<any> => {
    try {
        const {
            method,
            body: { id: _id, isComplete },
        } = req;
        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!_id) {
            throw new Error('Missing field: _id');
        }
        if (isComplete === undefined) {
            throw new Error('Missing field: isComplete');
        }
        await connectDb();
        const todo = await Todo.findOneAndUpdate(
            { _id },
            { isComplete: !isComplete },
            { new: true } /* Return updated object */
        );

        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
