import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import {
    DELETE_TODO,
    EDIT_TODO,
    TOGGLE_TODO,
    GET_TODOS,
} from '../../store/todos';

import { SwipableTodo } from './SwipableTodo';
import { ITodo } from '../../models';

interface TodoProps {
    todo: ITodo;
    dragHandleProps: any;
}

type CacheData = { todos: ITodo[] } | null;

export const Todo: React.FC<TodoProps> = ({
    todo: { id, task, isComplete },
    dragHandleProps,
}) => {
    const [toggleTodoMutation] = useMutation(TOGGLE_TODO);
    const toggleTodo = () => {
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
                            todos: updatedTodos,
                        },
                    });
                }
            },
        });
    };

    const [editTodoMutation] = useMutation(EDIT_TODO);
    const editTodo = (text: string) => {
        editTodoMutation({
            variables: { id, task: text },
            optimisticResponse: {
                editTodo: {
                    __typename: 'TodoUpdateResponse',
                    success: true,
                    data: {
                        id,
                        task: text,
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
                        item.id === id ? { ...item, task: text } : item
                    );

                    cache.writeQuery({
                        query: GET_TODOS,
                        data: {
                            todos: updatedTodos,
                        },
                    });
                }
            },
        });
    };

    const [deleteTodoMutation] = useMutation(DELETE_TODO);
    const deleteTodo = () => {
        deleteTodoMutation({
            variables: { id },
            optimisticResponse: {
                deleteTodo: {
                    __typename: 'ResponseMessage',
                    success: true,
                },
            },
            update: (cache, { data: { deleteTodo } }) => {
                const data: CacheData = cache.readQuery({
                    query: GET_TODOS,
                });

                if (data && deleteTodo) {
                    const updatedTodos = data.todos.filter(
                        (item: ITodo) => item.id !== id
                    );

                    cache.writeQuery({
                        query: GET_TODOS,
                        data: {
                            todos: updatedTodos,
                        },
                    });
                }
            },
        });
    };

    return (
        <SwipableTodo
            text={task}
            isComplete={isComplete}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
            dragHandleProps={dragHandleProps}
        />
    );
};
