import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';

import { typeDefs } from './backend/src/schema';
import { resolvers } from './backend/src/resolvers';
import { models } from './backend/src/models';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        models,
    }),
});

const app = express();

app.use(express.static(path.join(__dirname, 'frontend/dist')));

server.applyMiddleware({ app });

mongoose.connect(process.env.DATABASE_URI!, {
    useNewUrlParser: true,
    useFindAndModify: false,
});

const port = process.env.PORT || 4000;
app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

process.on('exit', () => {
    server.stop();
    console.log('Process terminated');
});
