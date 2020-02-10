import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { App } from '~/App';

import './index.css';

const baseUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
const cache = new InMemoryCache();
const link = new HttpLink({ uri: `${baseUrl}/graphql` });

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
