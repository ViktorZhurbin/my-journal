import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
    DELETE_ALL_TODOS,
    GET_TODOS,
    UPDATE_ALL_TODOS,
} from '../../store/todos';
import { ITodo } from '../../models';

import { TodoList } from './TodoList';

const TodoListContainer = () => {
    const { data, loading, error } = useQuery(GET_TODOS);

    const [updateAllTodos] = useMutation(UPDATE_ALL_TODOS, {
        update: (proxy: any, { data: { updateAllTodos } }: any) => {
            if (updateAllTodos) {
                proxy.writeQuery({
                    query: GET_TODOS,
                    data: updateAllTodos.data,
                });
            }
        },
    });

    const handleReorder = (reordered: ITodo[]) => {
        // need to strip __typename manually
        // see https://github.com/apollographql/apollo-feature-requests/issues/6
        const todos = reordered.map(({ id, task, isComplete }) => ({
            id,
            task,
            isComplete,
        }));
        const optimisticResponse = {
            updateAllTodos: {
                __typename: 'TodoUpdateAllResponse',
                success: true,
                data: {
                    __typename: 'Query',
                    todos: reordered,
                },
            },
        };
        updateAllTodos({
            variables: { todos },
            optimisticResponse,
        });
    };

    const [deleteAllTodos] = useMutation(DELETE_ALL_TODOS);

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        data && (
            <>
                <button onClick={() => deleteAllTodos()}>Delete All</button>
                <TodoList reorder={handleReorder} todos={data.todos} />
            </>
        )
    );
};

export { TodoListContainer as TodoList };
