import mongodb, { FindOneAndUpdateOption, UpdateQuery } from 'mongodb';

import { connectDb } from '../../../utils/initDb';
import { GenericObject } from '@/@types/GenericObject';

export const findAccountAndUpdate = async (
    userId: string,
    update: UpdateQuery<GenericObject>,
    options?: FindOneAndUpdateOption<GenericObject>
): Promise<any> => {
    const { db } = await connectDb();

    const { value } = await db
        .collection('accounts')
        .findOneAndUpdate({ userId: new mongodb.ObjectId(userId) }, update, {
            returnOriginal: false,
            ...options,
        });

    return value;
};
