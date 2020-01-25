const { gql } = require('apollo-boost');

const typeDefs = gql`
    type Todo {
        id: String!
        task: String!
        isComplete: Boolean!
    }

    input TodoInput {
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

    type TodoUpdateAllResponse {
        success: Boolean
        message: String
        data: Todos
    }

    type Todos {
        todos: AllTodos
    }

    type AllTodos {
        all: [Todo]
        active: [Todo]
        completed: [Todo]
    }

    type Query {
        todos: AllTodos
    }

    type Mutation {
        createTodo(task: String!): TodoUpdateResponse
        deleteTodo(id: String!): TodoIdResponse
        editTodo(id: String!, task: String!): TodoUpdateResponse
        toggleTodo(id: String!): TodoUpdateResponse
        updateAllTodos(todos: [TodoInput]): TodoUpdateAllResponse
    }
`;

module.exports = typeDefs;
