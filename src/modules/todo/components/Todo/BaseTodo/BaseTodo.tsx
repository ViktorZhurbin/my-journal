import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { mutate } from 'swr';

import { Checkbox } from '@/components/Checkbox';
import { EditableText } from '@/components/EditableText';
import { ITodo } from '../../../types';
import { toggleTodo, editTodo, deleteTodo } from '../../../api';
import styles from './BaseTodo.module.css';

const cx = classNames.bind(styles);

interface BaseTodoProps {
    todo: ITodo;
}

export const BaseTodo: React.FC<BaseTodoProps> = ({ todo }) => {
    const [isFocused, setFocused] = useState(false);

    const handleDelete = async () => {
        mutate(
            '/api/todo/get',
            async ({ data }: { data: ITodo[] }) => {
                const newTodos = data.filter((item) => item._id !== todo._id);
                return { success: true, data: newTodos };
            },
            false
        );
        await deleteTodo(todo._id);
        mutate('/api/todo/get');
    };

    const handleToggle = async () => {
        mutate(
            '/api/todo/get',
            async ({ data }: { data: ITodo[] }) => {
                const newTodos = data.map((item) =>
                    item._id === todo._id
                        ? { ...item, isComplete: !item.isComplete }
                        : item
                );
                return { success: true, data: newTodos };
            },
            false
        );
        await toggleTodo(todo);
        mutate('/api/todo/get');
    };

    const handleEdit = async (value: string) => {
        mutate(
            '/api/todo/get',
            async ({ data }: { data: ITodo[] }) => {
                const newTodos = data.map((item) =>
                    item._id === todo._id ? { ...item, task: value } : item
                );
                return { success: true, data: newTodos };
            },
            false
        );
        await editTodo({ ...todo, task: value });
        mutate('/api/todo/get');
    };

    return (
        <li className={cx('todo', { isFocused })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={todo.isComplete}
                onToggle={handleToggle}
            />
            <EditableText
                text={todo.task}
                className={cx('text', { isComplete: todo.isComplete })}
                onEdit={handleEdit}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
            />
            <span className={cx('delete')} onClick={handleDelete}>
                X
            </span>
        </li>
    );
};
