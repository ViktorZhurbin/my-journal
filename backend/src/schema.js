const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Todo {
        id: String!
        task: String!
        isComplete: Boolean!
    }

    type TodoUpdateResponse {
        success: Boolean
        message: String
        data: Todo
    }

    type TodoIdResponse {
        success: Boolean
        message: String
        data: String
    }

    type Query {
        todos: [Todo]!
    }

    type Mutation {
        createTodo(task: String!): TodoUpdateResponse
        deleteTodo(id: String!): TodoIdResponse
        editTodo(id: String!, task: String!): TodoUpdateResponse
        toggleTodo(id: String!): TodoUpdateResponse
    }
`;

module.exports = typeDefs;
