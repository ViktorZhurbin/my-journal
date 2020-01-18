import gql from 'graphql-tag';

// export const TODO = gql`
//     type Todo {
//         todo: {
//             id
//             task
//             isComplete
//         }
//     }
// `;

// QUERIES
export const GET_TODOS = gql`
    query Todos {
        todos {
            id
            task
            isComplete
        }
    }
`;

// MUTATIONS
export const UPDATE_TODOS = gql`
    mutation UpdateTodos($todos: [Todo]) {
        updateTodos(todos: $todos) {
            success
            message
            data {
                id
                task
                isComplete
            }
        }
    }
`;

export const CREATE_TODO = gql`
    mutation CreateTodo($task: String!) {
        createTodo(task: $task) {
            success
            message
            data {
                id
                task
                isComplete
            }
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: String!) {
        deleteTodo(id: $id) {
            success
            message
            data
        }
    }
`;

export const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: String!) {
        toggleTodo(id: $id) {
            success
            message
            data {
                id
                task
                isComplete
            }
        }
    }
`;

export const EDIT_TODO = gql`
    mutation EditTodo($id: String!, $task: String!) {
        editTodo(id: $id, task: $task) {
            success
            message
            data {
                id
                task
                isComplete
            }
        }
    }
`;
