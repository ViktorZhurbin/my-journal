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

let connection = null;

export const connectDb = async () => {
    if (connection === null) {
        try {
            connection = await getConnection();
        } catch (error) {
            console.log('connectDb error: ', error);
        }
    }
    return connection;
};

mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
);

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
