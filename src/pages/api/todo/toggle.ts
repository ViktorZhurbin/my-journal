import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from '../../../utils/initDb';
import { Account } from '../../../models/Account';

import { Todo } from '@/modules/todo/@types';
type Data = {
    success: boolean;
    data?: Todo;
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

        const account = await Account.findOne({ userId });
        await account.todos.id(_id).set({ isComplete: !isComplete });
        const { todos } = await account.save();

        res.status(201).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
