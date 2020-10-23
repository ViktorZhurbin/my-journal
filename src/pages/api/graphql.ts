import 'dotenv/config';
import { ApolloServer } from 'apollo-server-micro';
import { connectDb, initModels } from '../../apollo/utils/db';
import { schema } from '../../apollo/schema';

export const config = {
    api: {
        bodyParser: false,
    },
};

initModels();
connectDb();

const server = new ApolloServer({
    schema,
});

export default server.createHandler({
    path: '/api/graphql',
});
