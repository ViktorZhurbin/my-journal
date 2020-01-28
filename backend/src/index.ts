import 'dotenv/config';
import { ApolloServer } from 'apollo-server';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createStore } from './todos/createStore';
import { TodoAPI } from './todos/api';

const store = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        todoAPI: new TodoAPI({ store }),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

process.on('exit', () => {
    server.stop();
    console.log('Process terminated');
});
