import 'dotenv/config';
import { ApolloServer } from 'apollo-server-micro';
import { getDbConnection } from '../../apollo/utils/db';
import { schema } from '../../apollo/schema';
// import { models } from '../../apollo/models';

export const config = {
    api: {
        bodyParser: false,
    },
};

const server = new ApolloServer({
    schema,
    context: async () => {
        await getDbConnection();

        // return { models };
    },
});

export default server.createHandler({
    path: '/api/graphql',
});
