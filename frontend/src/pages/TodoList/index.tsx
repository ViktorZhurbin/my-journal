import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { CREATE_TODO, GET_TODOS, UPDATE_ALL_TODOS } from '~/store/todos';
import { ITodo } from '~/models';

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

    const [createTodo] = useMutation(CREATE_TODO, {
        update: (proxy: any, { data: { createTodo } }: any) => {
            const data = proxy.readQuery({
                query: GET_TODOS,
            });

            if (createTodo) {
                const newTodo = createTodo.data;
                data.todos = [...data.todos, newTodo];
                proxy.writeQuery({
                    query: GET_TODOS,
                    data,
                });
            }
        },
    });
    const handleCreateTodo = (task: string) => {
        if (task.length) {
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
        }
    };

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        data && (
            <TodoList
                createTodo={handleCreateTodo}
                reorder={handleReorder}
                todos={data.todos}
            />
        )
    );
};

export { TodoListContainer as TodoList };
