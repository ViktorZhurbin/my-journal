import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from '../../../utils/initDb';
import { Account } from '../../../models/Account';

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
        const { userId } = await getSession({ req });

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

        const todo = await Account.findOneAndUpdate(
            { userId },
            { $set: { 'todos.$[todo].isComplete': !isComplete } },
            {
                arrayFilters: [{ 'todo._id': { $eq: _id } }],
                new: true,
            }
        );

        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
