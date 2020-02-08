import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { DELETE_TODO, EDIT_TODO, TOGGLE_TODO, GET_TODOS } from '~/store/todos';

import { SwipableTodo } from './SwipableTodo';
import { ITodo } from '~/models';

interface TodoContainerProps {
    todo: ITodo;
    dragHandleProps: any;
}

const TodoContainer: React.FC<TodoContainerProps> = ({
    todo: { id, task, isComplete },
    dragHandleProps,
}) => {
    const [toggleTodo] = useMutation(TOGGLE_TODO, {
        update: (proxy: any, { data: { toggleTodo } }: any) => {
            const data = proxy.readQuery({
                query: GET_TODOS,
            });

            if (toggleTodo) {
                const toggledIsComplete = toggleTodo.data.isComplete;
                const updatedTodos = data.todos.map((item: ITodo) =>
                    item.id === id
                        ? { ...item, isComplete: toggledIsComplete }
                        : item
                );

                proxy.writeQuery({
                    query: GET_TODOS,
                    data: {
                        todos: updatedTodos,
                    },
                });
            }
        },
    });
    const handleToggleTodo = useCallback(() => {
        const optimisticResponse = {
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
        };
        toggleTodo({
            variables: { id, isComplete },
            optimisticResponse,
        });
    }, [id, isComplete]);

    const [editTodo] = useMutation(EDIT_TODO, {
        update: (proxy: any, { data: { editTodo } }: any) => {
            const data = proxy.readQuery({
                query: GET_TODOS,
            });

            if (editTodo) {
                const editedTask = editTodo.data.task;
                const updatedTodos = data.todos.map((item: ITodo) =>
                    item.id === id ? { ...item, task: editedTask } : item
                );

                proxy.writeQuery({
                    query: GET_TODOS,
                    data: {
                        todos: updatedTodos,
                    },
                });
            }
        },
    });
    const handleEditTodo = useCallback(
        (task: string) => {
            if (task.length) {
                const optimisticResponse = {
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
                };
                editTodo({
                    variables: { id, task },
                    optimisticResponse,
                });
            }
        },
        [id, task]
    );

    const [deleteTodo] = useMutation(DELETE_TODO, {
        update: (proxy: any, { data: { deleteTodo } }: any) => {
            const data = proxy.readQuery({
                query: GET_TODOS,
            });

            if (deleteTodo) {
                const updatedTodos = data.todos.filter(
                    (item: ITodo) => item.id !== id
                );

                proxy.writeQuery({
                    query: GET_TODOS,
                    data: {
                        todos: updatedTodos,
                    },
                });
            }
        },
    });
    const handleDeleteTodo = () => {
        const optimisticResponse = {
            deleteTodo: {
                __typename: 'ResponseMessage',
                success: true,
            },
        };
        deleteTodo({
            variables: { id },
            optimisticResponse,
        });
    };

    return (
        <SwipableTodo
            task={task}
            isComplete={isComplete}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            dragHandleProps={dragHandleProps}
        />
    );
};

export { TodoContainer as SwipableTodo };
