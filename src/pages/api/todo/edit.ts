import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { findAccountAndUpdate } from '@/modules/account/utils/db';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { id: _id, task },
        } = req;
        const { userId } = await getSession({ req });

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!_id) {
            throw new Error('Missing field: _id');
        }

        const { todos } = await findAccountAndUpdate(
            userId,
            { $set: { 'todos.$[todo].task': task } },
            { arrayFilters: [{ 'todo._id': { $eq: _id } }] }
        );

        res.status(201).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
