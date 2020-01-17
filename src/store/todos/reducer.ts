import { createReducer } from '@reduxjs/toolkit';

import { ITodo } from '~/models';
import { initialState } from '~/store/initialState';
import {
    todoToggleAction,
    todoAddAction,
    todoDeleteAction,
    todoEditAction,
} from './actions';

export const todos = createReducer(initialState.todos, {
    [todoToggleAction.type]: (state, { payload }) =>
        state &&
        state.map((todo: ITodo) =>
            todo.id === payload.id
                ? { ...todo, isComplete: !todo.isComplete }
                : todo
        ),

    [todoEditAction.type]: (state, { payload }) =>
        state &&
        state.map((todo: ITodo) =>
            todo.id === payload.id
                ? { ...payload, isComplete: todo.isComplete }
                : todo
        ),

    [todoAddAction.type]: (state, { payload }) =>
        state ? [...state, payload] : [payload],

    [todoDeleteAction.type]: (state, { payload }) =>
        state && state.filter(todo => todo.id !== payload.id),
});
