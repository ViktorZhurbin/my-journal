import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { mutate } from 'swr';

import { Checkbox } from '@/components/Checkbox';
import { TextArea } from '@/components/TextArea';
import { Todo } from '../../../@types';
import { toggleTodo, editTodo, deleteTodo } from '../../../services';
import styles from './BaseTodo.module.css';

const cx = classNames.bind(styles);

interface BaseTodoProps {
    todo: Todo;
}

export const BaseTodo: React.FC<BaseTodoProps> = ({ todo }) => {
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleDelete = async () => {
        mutate(
            '/api/todo/get',
            async ({ data }: { data: Todo[] }) => {
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
            async ({ data }: { data: Todo[] }) => {
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
            async ({ data }: { data: Todo[] }) => {
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

    const handleBlur = () => {
        setFocused(false);
        inputRef?.current?.blur();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (['Escape', 'Enter'].includes(event.key)) {
            handleBlur();
        }
    };

    return (
        <li className={cx('todo', { isFocused })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={todo.isComplete}
                onToggle={handleToggle}
            />
            <TextArea
                ref={inputRef}
                value={todo.task}
                className={cx('text', { isComplete: todo.isComplete })}
                onChange={handleEdit}
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
