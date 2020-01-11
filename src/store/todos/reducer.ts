import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import {
    todoToggleAction,
    todoAddAction,
    todoDeleteAction,
    todoEditAction,
} from './actions';
import { ITodoList, ITodo } from '~/models';

const initialTodos: ITodoList = {
    ids: ['a', 'b'],
    byId: {
        a: {
            id: 'a',
            task: 'Learn React',
            isDone: false,
        },
        b: {
            id: 'b',
            task: 'Learn Firebase',
            isDone: false,
        },
    },
};

export const todos = createReducer(/* initialState.todos */ initialTodos, {
    [todoToggleAction.type]: (state, { payload }) => {
        const toggledTodo = state.byId[payload.id];
        const newById = {
            ...state.byId,
            [payload.id]: {
                ...toggledTodo,
                isDone: !toggledTodo.isDone,
            },
        };
        return { ...state, byId: newById };
    },

    [todoEditAction.type]: (state, { payload }) => {
        const todo = state.byId[payload.id];
        const newById = {
            ...state.byId,
            [payload.id]: {
                ...todo,
                task: payload.task,
            },
        };
        return { ...state, byId: newById };
    },

    [todoAddAction.type]: (state, { payload }) => ({
        ids: [...state.ids, payload.id],
        byId: {
            ...state.byId,
            [payload.id]: payload,
        },
    }),

    [todoDeleteAction.type]: (state, { payload }) => {
        const newIds = state.ids.filter(id => id !== payload.id);
        const newById = Object.keys(state.byId).reduce<{
            [key: string]: ITodo;
        }>((object, key) => {
            if (key !== payload.id) {
                object[key] = state.byId[key];
            }

            return object;
        }, {});

        return {
            ids: newIds,
            byId: newById,
        };
    },
});
