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
            body: { task },
        } = req;
        const { userId } = await getSession({ req });

        if (method !== 'POST') {
            throw new Error('Request method must be POST');
        }
        if (!task) {
            throw new Error('Missing field: task');
        }

        await connectDb();
        const account = await Account.findOneAndUpdate(
            { userId },
            { $push: { todos: { task } } },
            { new: true }
        );

        res.status(201).json({ success: true, data: account.todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
