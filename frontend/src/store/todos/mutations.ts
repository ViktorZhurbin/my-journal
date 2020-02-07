import { gql } from 'apollo-boost';

export const UPDATE_ALL_TODOS = gql`
    mutation UpdateAllTodos($todos: [TodoInput]!) {
        updateAllTodos(todos: $todos) {
            success
            data {
                todos {
                    id
                    task
                    isComplete
                }
            }
        }
    }
`;

export const CREATE_TODO = gql`
    mutation CreateTodo($task: String!) {
        createTodo(task: $task) {
            success
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
        }
    }
`;

export const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: String!, $isComplete: Boolean!) {
        toggleTodo(id: $id, isComplete: $isComplete) {
            success
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
            data {
                id
                task
                isComplete
            }
        }
    }
`;
