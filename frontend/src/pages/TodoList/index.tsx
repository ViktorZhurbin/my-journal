import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { CREATE_TODO, GET_TODOS, UPDATE_ALL_TODOS } from '~/store/todos';
import { ITodo } from '~/models';

import { TodoList } from './TodoList';

const TodoListContainer = () => {
    const { data, loading, error } = useQuery(GET_TODOS);
    const [active, setActive] = useState();
    const [completed, setCompleted] = useState();

    useEffect(() => {
        setCompleted(
            data && data.todos.filter((item: ITodo) => item.isComplete)
        );
        setActive(data && data.todos.filter((item: ITodo) => !item.isComplete));
    }, [data && data.todos]);

    const [updateAllTodos] = useMutation(UPDATE_ALL_TODOS, {
        update: (proxy: any, { data: { updateAllTodos } }: any) => {
            let data = proxy.readQuery({
                query: GET_TODOS,
            });

            if (updateAllTodos) {
                data = updateAllTodos.data;

                proxy.writeQuery({
                    query: GET_TODOS,
                    data,
                });
            }
        },
    });

    const handleReorderTodos = (reorderedActiveTodos: ITodo[]) => {
        const allTodos = reorderedActiveTodos.concat(completed);
        const todos = allTodos.map(({ id, task, isComplete }) => ({
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
                    todos: allTodos,
                },
            },
        };
        updateAllTodos({
            variables: { todos },
            optimisticResponse,
        });
    };

    const [createTodo] = useMutation(CREATE_TODO, {
        update: (proxy: any, { data: { createTodo } }: any) => {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({
                query: GET_TODOS,
            });

            if (createTodo) {
                // Add our todo from the mutation to the end.
                data.todos.push(createTodo.data);
                // Write our data back to the cache.
                proxy.writeQuery({
                    query: GET_TODOS,
                    data,
                });
            }
        },
    });
    const handleCreateTodo = (task: string) => {
        const optimisticResponse = {
            createTodo: {
                __typename: 'TodoUpdateResponse',
                success: true,
                data: {
                    __typename: 'Todo',
                    id: '-1', // -1 is a temporary id for the optimistic response.
                    task,
                    isComplete: false,
                },
            },
        };
        createTodo({
            variables: { task },
            optimisticResponse,
        });
    };

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        <TodoList
            createTodo={handleCreateTodo}
            reorderTodos={handleReorderTodos}
            active={active}
            completed={completed}
        />
    );
};

export { TodoListContainer as TodoList };
