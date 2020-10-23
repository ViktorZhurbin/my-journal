import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { mutate } from 'swr';

import { Checkbox } from '~/components/Checkbox';
import { TextField } from '~/components/TextField';

import styles from './BaseTodo.module.css';
import { ITodo } from '../../../types';
import { useTodo } from '../../../hooks/useTodo';

const cx = classNames.bind(styles);

interface BaseTodoProps {
    todo: ITodo;
}

export const BaseTodo: React.FC<BaseTodoProps> = ({ todo }) => {
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { toggleTodo, editTodo, deleteTodo } = useTodo();
    const { _id, task, isComplete } = todo;

    const handleDelete = async () => {
        mutate(
            '/api/getTodos',
            async ({ data }: { data: ITodo[] }) => {
                const newTodos = data.filter((item) => item._id !== _id);
                return { success: true, data: newTodos };
            },
            false
        );
        await deleteTodo(_id);
        mutate('/api/getTodos');
    };

    const handleToggle = async () => {
        mutate(
            '/api/getTodos',
            async ({ data }: { data: ITodo[] }) => {
                const newTodos = data.map((item) =>
                    item._id === _id
                        ? { ...item, isComplete: !item.isComplete }
                        : item
                );
                return { success: true, data: newTodos };
            },
            false
        );
        await toggleTodo(todo);
        mutate('/api/getTodos');
    };

    const handleEdit = async (value: string) => {
        mutate(
            '/api/getTodos',
            async ({ data }: { data: ITodo[] }) => {
                const newTodos = data.map((item) =>
                    item._id === _id ? { ...item, task: value } : item
                );
                return { success: true, data: newTodos };
            },
            false
        );
        await editTodo({ ...todo, task: value });
        mutate('/api/getTodos');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleEdit(event.target.value);
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
                onToggle={handleToggle}
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
            <span className={cx('delete')} onClick={handleDelete}>
                X
            </span>
        </li>
    );
};
