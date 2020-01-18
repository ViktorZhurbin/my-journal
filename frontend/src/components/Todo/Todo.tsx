import React, { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useMutation } from '@apollo/react-hooks';

import { DELETE_TODO, EDIT_TODO, TOGGLE_TODO, GET_TODOS } from '~/graphql';
import { Checkbox } from '~/components/Checkbox';
import { TextInput } from '~/components/TextInput';
import { ITodo } from '~/models';

import styles from './Todo.module.css';

const cx = classNames.bind(styles);

interface TodoProps {
    todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({
    todo: { id, task, isComplete },
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const [toggleTodo] = useMutation(TOGGLE_TODO);
    const handleToggleTodo = useCallback(
        () => toggleTodo({ variables: { id } }),
        [id]
    );

    const [updateTodo] = useMutation(EDIT_TODO);
    const handleUpdateTodo = useCallback(
        (task: string) =>
            updateTodo({
                variables: { id, task },
                refetchQueries: [{ query: GET_TODOS }],
            }),
        [id, task]
    );

    const [deleteTodo] = useMutation(DELETE_TODO);
    const handleDeleteTodo = useCallback(
        () =>
            deleteTodo({
                variables: { id },
                refetchQueries: [{ query: GET_TODOS }],
            }),
        [id]
    );

    return (
        <li className={cx('todo', { isEditing })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={isComplete}
                onToggle={handleToggleTodo}
            />
            <div className={cx('todoItem')}>
                <TextInput
                    text={task}
                    classNames={cx('todoText', { isComplete })}
                    onSubmit={handleUpdateTodo}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
                <div
                    className={cx('deleteButton')}
                    onClick={handleDeleteTodo}
                    role="button"
                    aria-label="Delete"
                />
            </div>
        </li>
    );
};
