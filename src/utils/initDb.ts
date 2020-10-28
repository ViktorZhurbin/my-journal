import { MongoClient } from 'mongodb';

const { DATABASE_URI } = process.env;
const MONGODB_DB = 'my-journal';

if (!DATABASE_URI) {
    throw new Error(
        'Please define the DATABASE_URI environment variable inside .env.local'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cached = global.mongo;
if (!cached) cached = global.mongo = {};

export async function connectDb(): Promise<any> {
    if (cached.conn) {
        return cached.conn;
    }

    try {
        const client = await MongoClient.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db(MONGODB_DB);
        cached.conn = { db, client };
        console.log('Connected to MongoDB');

        return cached.conn;
    } catch (error) {
        console.error('error', error.message);
    }
}
