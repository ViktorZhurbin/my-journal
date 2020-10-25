import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { mutate } from 'swr';

import { Checkbox } from '@/components/Checkbox';
import { TextArea } from '@/components/TextArea';
import { ITodo } from '../../../types';
import { toggleTodo, editTodo, deleteTodo } from '../../../api';
import styles from './BaseTodo.module.css';

const cx = classNames.bind(styles);

interface BaseTodoProps {
    todo: ITodo;
}

export const BaseTodo: React.FC<BaseTodoProps> = ({ todo }) => {
    const [isFocused, setFocused] = useState(false);
    const [height, setHeight] = useState<number>();
    const inputRef = useRef<HTMLTextAreaElement>(null);

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

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    const calcHeight = (value: string) => {
        const numberOfLineBreaks = (value.match(/\n/g) || []).length;
        console.log('value', value);
        console.log('numberOfLineBreaks', numberOfLineBreaks);
        // min-height + lines x line-height + padding + border
        return 1.5 + numberOfLineBreaks;
    };

    const onKeyUp = () => {
        if (inputRef?.current) {
            const {
                offsetHeight,
                scrollHeight,
                clientHeight,
                style,
            } = inputRef?.current;
            console.log('offsetHeight', offsetHeight);
            console.log('clientHeight', clientHeight);
            console.log('scrollHeight', scrollHeight);
            const height =
                offsetHeight === scrollHeight ? '1.5rem' : `${scrollHeight}px`;
            style.height = height;
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
                // styles={{ height: `${height}px` }}
                value={todo.task}
                className={cx('text', { isComplete: todo.isComplete })}
                onChange={handleChange}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onKeyDown={handleKeyDown}
                onKeyUp={onKeyUp}
            />
            <span className={cx('delete')} onClick={handleDelete}>
                X
            </span>
        </li>
    );
};
