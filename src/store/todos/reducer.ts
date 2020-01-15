import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import {
    todoToggleAction,
    todoAddAction,
    todoDeleteAction,
    todoEditAction,
} from './actions';
import { ITodo } from '~/models';

const initialTodos: ITodo[] = [
    {
        id: 'a',
        task: 'Learn React',
        isDone: false,
    },
    {
        id: 'b',
        task: 'Learn Firebase',
        isDone: false,
    },
    {
        id: 'c',
        task: 'Learn DOM',
        isDone: true,
    },
    {
        id: 'd',
        task: 'Learn CSS',
        isDone: false,
    },
];

export const todos = createReducer(/* initialState.todos */ initialTodos, {
    [todoToggleAction.type]: (state, { payload }) =>
        state.map((todo: ITodo) =>
            todo.id === payload.id ? { ...todo, isDone: !todo.isDone } : todo
        ),

    [todoEditAction.type]: (state, { payload }) =>
        state.map((todo: ITodo) =>
            todo.id === payload.id ? { ...payload, isDone: todo.isDone } : todo
        ),

    [todoAddAction.type]: (state, { payload }) => [...state, payload],

    [todoDeleteAction.type]: (state, { payload }) =>
        state.filter(todo => todo.id !== payload.id),
});
