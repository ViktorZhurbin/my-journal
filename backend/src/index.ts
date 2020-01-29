import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { models } from './models';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        models,
    }),
});

mongoose.connect(process.env.DATABASE_URI!, {
    useNewUrlParser: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

process.on('exit', () => {
    server.stop();
    console.log('Process terminated');
});