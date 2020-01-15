import { createAction } from '@reduxjs/toolkit';
import uuidv4 from 'uuid/v4';

export const todoToggleAction = createAction('TODO__TOGGLE', id => ({
    payload: { id },
}));

export const todoAddAction = createAction('TODO__ADD', task => ({
    payload: {
        id: uuidv4(),
        task,
        isDone: false,
    },
}));

export const todoEditAction = createAction('TODO__EDIT', (id, task) => ({
    payload: { id, task },
}));

export const todoDeleteAction = createAction('TODO__DELETE', id => ({
    payload: { id },
}));
