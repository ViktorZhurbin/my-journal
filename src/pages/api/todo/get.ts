import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from '../../../utils/initDb';
import { Account } from '@/models/Account';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method } = req;
        const { userId } = await getSession({ req });

        await connectDb();

        if (!userId) {
            throw new Error('Not signed in');
        }

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        await connectDb();
        const account = await Account.findOne({ userId });

        res.status(200).json({ success: true, data: account.todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
