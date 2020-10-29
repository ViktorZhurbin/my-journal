import mongoose from 'mongoose';
import { schemas } from '../models';

const createModels = () => {
    try {
        const modelNames = mongoose.modelNames();

        Object.entries(schemas).forEach(([name, schema]) => {
            if (!modelNames.includes(name)) {
                mongoose.model(name, schema);
            }
        });
        console.log('Models are good now');
    } catch (error) {
        console.error('createModels', error);
    }
};

export const connectDb = async (): Promise<void> => {
    const disconnected = mongoose.connection['_readyState'] === 0;
    if (disconnected) {
        try {
            await mongoose.connect(process.env.DATABASE_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        } catch (error) {
            console.error('connectDb error: ', error);
        }
    }

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'MongoDB connection error:')
    );

    mongoose.connection.on('connected', () =>
        console.log('Connected to MongoDB')
    );
};

export const initDb = async (): Promise<void> => {
    createModels();
    await connectDb();
};
