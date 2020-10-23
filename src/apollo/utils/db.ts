import mongoose from 'mongoose';
import { models } from '../models';

export const initModels = () => {
    const modelNames = mongoose.modelNames();

    Object.entries(models).forEach(([name, schema]) => {
        if (!modelNames.includes(name)) {
            mongoose.model(name, schema);
        }
    });
};

const getConnection = () =>
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

export const connectDb = async () => {
    if (mongoose.connections.length) {
        try {
            await getConnection();
        } catch (error) {
            console.error('connectDb error: ', error);
        }
    }
};

mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
);

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
