import React, { useState, useCallback } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '~/components/Checkbox';
import { TextInput } from '~/components/TextInput';
import { ITodo } from '~/models';
import {
    todoToggleAction,
    todoDeleteAction,
    todoEditAction,
} from '~/store/todos/actions';

import styles from './Todo.module.css';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

interface TodoProps {
    todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({ todo: { id, task, isDone } }) => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const toggleTodo = useCallback(() => dispatch(todoToggleAction(id)), [
        dispatch,
        id,
    ]);

    const deleteTodo = useCallback(() => dispatch(todoDeleteAction(id)), [
        dispatch,
        id,
    ]);
    const editTodo = useCallback(
        (task: string) => dispatch(todoEditAction(id, task)),
        [dispatch, id, task]
    );

    return (
        <li className={cx('todo', { isEditing })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={isDone}
                onToggle={toggleTodo}
            />
            <TextInput
                text={task}
                classNames={cx('todoText', { isDone })}
                onDelete={deleteTodo}
                onSubmit={editTodo}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </li>
    );
};
