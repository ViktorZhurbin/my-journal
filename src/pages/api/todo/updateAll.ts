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
            body: { updatedTodos },
        } = req;
        const { userId } = await getSession({ req });

        if (method !== 'POST') {
            throw new Error('Request method must be POST');
        }

        if (!updatedTodos) {
            throw new Error('Missing field: updatedTodos');
        }

        const { todos } = await findAccountAndUpdate(userId, {
            $set: { todos: updatedTodos },
        });

        res.status(201).json({ success: true, data: todos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
