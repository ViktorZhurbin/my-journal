import { Action } from '@reduxjs/toolkit';

export interface ITodoList {
    ids: string[];
    byId: { [key: string]: ITodo };
}

export interface ITodo {
    id: string;
    task: string;
    isDone: boolean;
}
