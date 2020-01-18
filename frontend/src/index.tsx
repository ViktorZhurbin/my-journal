import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

// import { typeDefs } from './graphql/schema';
// import { resolvers } from './graphql/resolvers';
import { App } from '~/App';

import './index.css';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/',
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link,
    // typeDefs,
    // resolvers,
});

// cache.writeData({
//     data: {
//         todos: [],
//     },
// });

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
