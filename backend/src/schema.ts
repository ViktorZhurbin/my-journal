import { gql } from 'apollo-server-express';

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

    type ResponseMessage {
        success: Boolean!
    }

    type Id {
        id: String!
    }

    type TodoDeleteResponse {
        success: Boolean!
        data: Id!
    }

    type TodoUpdateResponse {
        success: Boolean!
        data: Todo!
    }

    type Query {
        todos: [Todo]!
    }

    type TodoUpdateAllResponse {
        success: Boolean!
        data: Query
    }

    type Mutation {
        createTodo(task: String!): TodoUpdateResponse!
        deleteTodo(id: String!): TodoDeleteResponse!
        deleteAllTodos: ResponseMessage!
        editTodo(id: String!, task: String!): TodoUpdateResponse!
        toggleTodo(id: String!, isComplete: Boolean!): TodoUpdateResponse!
        updateAllTodos(todos: [TodoInput]!): TodoUpdateAllResponse!
    }
`;

export { typeDefs };
