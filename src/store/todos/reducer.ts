import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import {
    todoToggleAction,
    todoAddAction,
    todoDeleteAction,
    todoEditAction,
    setVisibilityFilter,
} from './actions';
import { ITodoList, ITodo } from '~/models';

const initialTodos: ITodoList = {
    visibilityFilter: 'SHOW_ALL',
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
    [setVisibilityFilter.type]: (state, { payload }) => {
        return { ...state, visibilityFilter: payload };
    },

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
        ...state,
        ids: [...state.ids, payload.id],
        byId: {
            ...state.byId,
            [payload.id]: payload,
        },
    }),

    [todoDeleteAction.type]: (state, { payload }) => {
        const newIds: string[] = [];
        const newById: { [key: string]: ITodo } = {};

        state.ids.forEach((id: string) => {
            if (id !== payload.id) {
                newIds.push(id);
                newById[id] = state.byId[id];
            }
        });

        return {
            ...state,
            ids: newIds,
            byId: newById,
        };
    },
});
