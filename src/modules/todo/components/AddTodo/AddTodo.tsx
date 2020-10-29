import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { mutate } from 'swr';

import { TextArea } from '@/components/TextArea';
import { createTodo } from '../../services';
import { Todo, ResponseData } from '../../@types';
import styles from './AddTodo.module.css';

const cx = classNames.bind(styles);

export const AddTodo: React.FC = () => {
    const [value, setValue] = useState('');
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleCreate = async (value: string) => {
        const newTodo: Todo = {
            isComplete: false,
            _id: '-1',
            task: value,
        };
        const getOptimisticResponse = (cache: ResponseData) => {
            return {
                success: true,
                data: [...cache.data, newTodo],
            };
        };

        mutate(
            '/api/todo/get',
            (cache: ResponseData) => getOptimisticResponse(cache),
            false
        );

        await createTodo(value);
        mutate('/api/todo/get');
    };

    const handleSubmit = (value: string) => {
        if (!value) {
            return;
        }
        setValue('');
        handleCreate(value);
    };

    const handleCancel = () => {
        setFocused(false);
        inputRef?.current?.blur();
        setValue('');
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case 'Enter':
                return handleSubmit(value);
            case 'Escape':
                return handleCancel();
            default:
                return undefined;
        }
    };

    return (
        <li className={cx('addTodo', { isFocused })}>
            <i className={cx('plus')} />
            <TextArea
                ref={inputRef}
                value={value}
                placeholder={isFocused ? '' : 'New task'}
                className={cx('input')}
                onChange={setValue}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onKeyDown={handleKeyDown}
            />
        </li>
    );
};
