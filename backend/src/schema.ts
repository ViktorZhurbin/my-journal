import { gql } from 'apollo-boost';

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

    type TodoUpdateResponse {
        success: Boolean!
        data: Todo!
    }

    type TodoUpdateAllResponse {
        success: Boolean!
        data: Query
    }

    type Query {
        todos: [Todo]!
    }

    type Mutation {
        createTodo(task: String!): TodoUpdateResponse!
        deleteTodo(id: String!): ResponseMessage!
        editTodo(id: String!, task: String!): TodoUpdateResponse!
        toggleTodo(id: String!, isComplete: Boolean!): TodoUpdateResponse!
        updateAllTodos(todos: [TodoInput]!): TodoUpdateAllResponse!
    }
`;

export { typeDefs };
