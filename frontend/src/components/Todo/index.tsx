import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { DELETE_TODO, EDIT_TODO, TOGGLE_TODO, GET_TODOS } from '~/store/todos';

import { Todo } from './Todo';
import { ITodo } from '~/models';

interface TodoContainerProps {
    todo: ITodo;
}

const TodoContainer: React.FC<TodoContainerProps> = ({
    todo: { id, task, isComplete },
}) => {
    const [toggleTodo] = useMutation(TOGGLE_TODO);
    const onToggle = useCallback(
        () =>
            toggleTodo({
                variables: { id },
                refetchQueries: [{ query: GET_TODOS }],
            }),
        [id]
    );

    const [editTodo] = useMutation(EDIT_TODO);
    const onEdit = useCallback(
        (task: string) =>
            editTodo({
                variables: { id, task },
                refetchQueries: [{ query: GET_TODOS }],
            }),
        [id, task]
    );

    const [deleteTodo] = useMutation(DELETE_TODO);
    const onDelete = useCallback(
        () =>
            deleteTodo({
                variables: { id },
                refetchQueries: [{ query: GET_TODOS }],
            }),
        [id]
    );

    return (
        <Todo
            task={task}
            isComplete={isComplete}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
};

export { TodoContainer as Todo };
