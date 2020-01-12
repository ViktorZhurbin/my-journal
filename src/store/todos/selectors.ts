import { createSelector } from '@reduxjs/toolkit';

import { IStore } from '~/models/InterfaceStore';
import { ITodo } from '~/models';
import {
    SHOW_ACTIVE,
    SHOW_COMPLETED,
    SHOW_ALL,
} from '~/const/visibiltyFilters';

export const getTodosIds = (state: IStore) => state.todos.ids;
export const getTodosByIds = (state: IStore) => state.todos.byId;
export const getVisibilityFilter = (state: IStore) =>
    state.todos.visibilityFilter;

export const getVisibleTodos = createSelector(
    [getTodosIds, getTodosByIds, getVisibilityFilter],
    (ids, byId, visibilityFilter) => {
        switch (visibilityFilter) {
            case SHOW_COMPLETED:
                let completedIds: string[] = [];
                let completedById: { [key: string]: ITodo } = {};
                ids.forEach(id => {
                    if (byId[id].isDone) {
                        completedIds.push(id);
                        completedById[id] = byId[id];
                    }
                });

                return {
                    ids: completedIds,
                    byId: completedById,
                    visibilityFilter: SHOW_COMPLETED,
                };
            case SHOW_ACTIVE:
                let activeIds: string[] = [];
                let activeById: { [key: string]: ITodo } = {};
                ids.forEach(id => {
                    if (!byId[id].isDone) {
                        activeIds.push(id);
                        activeById[id] = byId[id];
                    }
                });

                return {
                    ids: activeIds,
                    byId: activeById,
                    visibilityFilter: SHOW_ACTIVE,
                };

            default:
                return { ids, byId, visibilityFilter: SHOW_ALL };
        }
    }
);
