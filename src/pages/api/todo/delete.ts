import { NextApiResponse, NextApiRequest } from 'next';
import mongodb from 'mongodb';
import { getSession } from 'next-auth/client';

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
        console.log('req.body', req.body);
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

        const { db } = await connectDb();
        const { todos } = await db
            .collection('accounts')
            .findOneAndUpdate(
                { userId: new mongodb.ObjectId(userId) },
                { $pull: { todos: { _id: new mongodb.ObjectId(_id) } } }
            );

        res.status(201).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
