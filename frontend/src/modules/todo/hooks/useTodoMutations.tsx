import { useMutation } from '@apollo/client';

import {
    CREATE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    TOGGLE_TODO,
    GET_TODOS,
    UPDATE_ALL_TODOS,
} from '../resolvers';

import { ITodo } from '../models';

type CacheData = { todos: ITodo[] } | null;

export const useTodoMutations = () => {
    const [updateAllTodosMutation] = useMutation(UPDATE_ALL_TODOS);
    const updateAllTodos = (updatedTodos: ITodo[]) => {
        // need to strip __typename manually
        // see https://github.com/apollographql/apollo-feature-requests/issues/6
        const todos = updatedTodos.map(({ id, task, isComplete }) => ({
            id,
            task,
            isComplete,
        }));

        updateAllTodosMutation({
            variables: { todos },
            optimisticResponse: {
                updateAllTodos: {
                    __typename: 'TodoUpdateAllResponse',
                    success: true,
                    data: {
                        __typename: 'Query',
                        todos: updatedTodos,
                    },
                },
            },
            update: (proxy, { data: { updateAllTodos } }) => {
                if (updateAllTodos) {
                    proxy.writeQuery({
                        query: GET_TODOS,
                        data: updateAllTodos.data,
                    });
                }
            },
        });
    };

    const [createTodoMutation] = useMutation(CREATE_TODO);
    const createTodo = (task: string) => {
        task &&
            createTodoMutation({
                variables: { task },
                optimisticResponse: {
                    createTodo: {
                        __typename: 'TodoUpdateResponse',
                        success: true,
                        data: {
                            __typename: 'Todo',
                            id: '-1',
                            task,
                            isComplete: false,
                        },
                    },
                },
                update: (proxy, { data: { createTodo } }) => {
                    const data: CacheData = proxy.readQuery({
                        query: GET_TODOS,
                    });

                    if (data && createTodo) {
                        const newTodo = createTodo.data;
                        const newTodos = [...data.todos, newTodo];
                        proxy.writeQuery({
                            query: GET_TODOS,
                            data: {
                                ...data,
                                todos: newTodos,
                            },
                        });
                    }
                },
            });
    };

    const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
    const toggleTodo = ({ id, task, isComplete }: ITodo) => {
        toggleTodoMutation({
            variables: { id, isComplete },
            optimisticResponse: {
                toggleTodo: {
                    __typename: 'TodoUpdateResponse',
                    success: true,
                    data: {
                        id,
                        task,
                        isComplete: !isComplete,
                        __typename: 'Todo',
                    },
                },
            },
            update: (cache, { data: { toggleTodo } }) => {
                const data: CacheData = cache.readQuery({
                    query: GET_TODOS,
                });

                if (data && toggleTodo?.data) {
                    const updatedTodos = data.todos.map((item: ITodo) =>
                        item.id === id
                            ? {
                                  ...item,
                                  isComplete: toggleTodo.data.isComplete,
                              }
                            : item
                    );

                    cache.writeQuery({
                        query: GET_TODOS,
                        data: {
                            ...data,
                            todos: updatedTodos,
                        },
                    });
                }
            },
        });
    };

    const [editTodoMutation] = useMutation(EDIT_TODO);
    const editTodo = ({ id, task, isComplete }: ITodo) => {
        editTodoMutation({
            variables: { id, task },
            optimisticResponse: {
                editTodo: {
                    __typename: 'TodoUpdateResponse',
                    success: true,
                    data: {
                        id,
                        task,
                        isComplete,
                        __typename: 'Todo',
                    },
                },
            },
            update: cache => {
                const data: CacheData = cache.readQuery({
                    query: GET_TODOS,
                });

                if (data) {
                    const updatedTodos = data.todos.map((item: ITodo) =>
                        item.id === id ? { ...item, task } : item
                    );

                    cache.writeQuery({
                        query: GET_TODOS,
                        data: {
                            ...data,
                            todos: updatedTodos,
                        },
                    });
                }
            },
        });
    };

    const [deleteTodoMutation] = useMutation(DELETE_TODO);
    const deleteTodo = (id: string) => {
        deleteTodoMutation({
            variables: { id },
            optimisticResponse: {
                deleteTodo: {
                    __typename: 'ResponseMessage',
                    success: true,
                },
            },
            update: cache => {
                const data: CacheData = cache.readQuery({
                    query: GET_TODOS,
                });

                if (data) {
                    const updatedTodos = [...data.todos].filter(
                        (item: ITodo) => item.id !== id
                    );

                    cache.writeQuery({
                        query: GET_TODOS,
                        data: {
                            ...data,
                            todos: updatedTodos,
                        },
                    });
                }
            },
        });
    };

    return {
        createTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        updateAllTodos,
    };
};
