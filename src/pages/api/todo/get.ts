import { NextApiResponse, NextApiRequest } from 'next';
import mongodb from 'mongodb';
import { getSession } from 'next-auth/client';

import { connectDb } from '../../../utils/initDb';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method } = req;
        const { userId } = await getSession({ req });

        if (!userId) {
            throw new Error('Not signed in');
        }

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        const { db } = await connectDb();
        const account = await db
            .collection('accounts')
            .findOne({ userId: new mongodb.ObjectId(userId) });

        res.status(200).json({ success: true, data: account.todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
