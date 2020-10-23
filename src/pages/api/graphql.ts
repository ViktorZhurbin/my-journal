import 'dotenv/config';
import { ApolloServer } from 'apollo-server-micro';

import { initDb } from '../../apollo/initDb';
import { schema } from '../../apollo/schema';

export const config = {
    api: {
        bodyParser: false,
    },
};

initDb();

const server = new ApolloServer({
    schema,
});

export default server.createHandler({
    path: '/api/graphql',
});
