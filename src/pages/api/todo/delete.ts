import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { Account } from '@/models/Account';
import { connectDb } from '../../../utils/initDb';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { id: _id },
        } = req;
        const { userId } = await getSession({ req });

        if (!userId) {
            throw new Error('Not signed in');
        }

        if (method !== 'DELETE') {
            throw new Error('Request method must be DELETE');
        }

        if (!_id) {
            throw new Error('Missing field: _id');
        }
        await connectDb();
        await Account.findOneAndUpdate(
            { userId },
            { $pull: { todos: { _id } } },
            { new: true }
        );

        res.status(201).json({ success: true, data: { _id } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
