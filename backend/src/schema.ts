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

    type AllTodos {
        all: [Todo]
        active: [Todo]
        completed: [Todo]
    }

    type Todos {
        todos: AllTodos
    }

    type TodoUpdateAllResponse {
        success: Boolean!
        data: Todos!
    }

    type Query {
        todos: AllTodos
    }

    type Mutation {
        createTodo(task: String!): TodoUpdateResponse!
        deleteTodo(id: String!): ResponseMessage!
        editTodo(id: String!, task: String!): TodoUpdateResponse!
        toggleTodo(id: String!): TodoUpdateResponse
        updateAllTodos(todos: [TodoInput]!): TodoUpdateAllResponse!
    }
`;

export { typeDefs };
