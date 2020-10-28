import mongoose from 'mongoose';
import { models } from '../models';

const createModels = async () => {
    try {
        const modelNames = await mongoose.modelNames();

        Object.entries(models).forEach(([name, schema]) => {
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
    if (!mongoose.connections.length) {
        try {
            await mongoose.connect(process.env.DATABASE_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log('Connected to MongoDB ');
        } catch (error) {
            console.error('connectDb error: ', error);
        }
    }

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'MongoDB connection error:')
    );

    mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
};

export const initDb = async (): Promise<void> => {
    await createModels();
    await connectDb();
};
