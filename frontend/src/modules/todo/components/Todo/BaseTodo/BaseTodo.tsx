import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '~/components/Checkbox';
import { TextField } from '~/components/TextField';

import styles from './BaseTodo.module.css';
import { ITodo } from '../../../models';
import { useTodoMutations } from '../../../hooks/useTodoMutations';

const cx = classNames.bind(styles);

interface BaseTodoProps {
    todo: ITodo;
}

export const BaseTodo: React.FC<BaseTodoProps> = ({ todo }) => {
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { toggleTodo, editTodo, deleteTodo } = useTodoMutations(todo);
    const { task, isComplete } = todo;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        editTodo(event.target.value);
    };

    const handleSubmit = () => {
        setFocused(false);
        inputRef?.current?.blur();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        } else if (event.key === 'Escape') {
            setFocused(false);
        }
    };

    return (
        <li className={cx('todo', { isFocused })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={isComplete}
                onToggle={toggleTodo}
            />
            <TextField
                ref={inputRef}
                value={task}
                className={cx('text', { isComplete })}
                onChange={handleChange}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onKeyDown={handleKeyDown}
            />
            <span className={cx('delete')} onClick={deleteTodo}>
                X
            </span>
        </li>
    );
};
