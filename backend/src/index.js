require('dotenv/config');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./todos/schema');
const resolvers = require('./todos/resolvers');
const TodoAPI = require('./todos/api');
const createStore = require('./todos/createStore');

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
    server.close(() => {
        console.log('Process terminated');
    });
});
