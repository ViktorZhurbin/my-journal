import mongoose from 'mongoose';

let connection = null;

export const getDbConnection = async () => {
    if (connection === null) {
        try {
            connection = await mongoose.connect(process.env.DATABASE_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        } catch (error) {
            console.log('getDbConnection error: ', error);
        }
    }
    return connection;
};

// const connection = mongoose.connect(process.env.DATABASE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// });

// connection.then(db => db).catch(err => console.log(err));

mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
);

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

export default getDbConnection;
