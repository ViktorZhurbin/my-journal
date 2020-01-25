import React, { useCallback } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import { CREATE_TODO, GET_TODOS, UPDATE_ALL_TODOS } from '~/store/todos';
import { ITodo } from '~/models';

import { TodoList } from './TodoList';

const TodoListContainer = () => {
    const { data, loading, error } = useQuery(GET_TODOS);

    const client = useApolloClient();
    const [updateAllTodos] = useMutation(UPDATE_ALL_TODOS);
    const handleReorderTodos = useCallback(
        (reorderedActiveTodos: ITodo[]) => {
            const allTodos = reorderedActiveTodos.concat(data.todos.completed);
            const todos = allTodos.map(({ id, task, isComplete }) => ({
                id,
                task,
                isComplete,
            }));
            return updateAllTodos({
                variables: { todos },
                refetchQueries: [{ query: GET_TODOS }],
            });
        },
        [data]
    );
    const cachedCreateTodo = (task: string) => {
        client.mutate({
            mutation: CREATE_TODO,
            variables: {
                task,
            },
            optimisticResponse: {
                createTodo: {
                    success: true,
                    message: 'todo added',
                    data: {
                        id: '-1', // -1 is a temporary id for the optimistic response.
                        task,
                        isComplete: false,
                        __typename: 'Todo',
                    },
                    __typename: 'TodoUpdateResponse',
                },
            },
            update: (proxy: any, { data: { createTodo } }: any) => {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({
                    query: GET_TODOS,
                });

                if (createTodo) {
                    // Add our todo from the mutation to the end.
                    data.todos.all.push(createTodo.data);
                    data.todos.active.push(createTodo.data);
                    // Write our data back to the cache.
                    proxy.writeQuery({
                        query: GET_TODOS,
                        data,
                    });
                }
            },
        });
    };

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        <TodoList
            createTodo={cachedCreateTodo}
            reorderTodos={handleReorderTodos}
            todos={data.todos}
        />
    );
};

export { TodoListContainer as TodoList };
