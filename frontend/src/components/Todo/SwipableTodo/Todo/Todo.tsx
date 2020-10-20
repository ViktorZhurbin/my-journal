import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '../../../Checkbox';
import { TextField } from '../../../TextField';

import styles from './Todo.module.css';

const cx = classNames.bind(styles);

interface TodoProps {
    task: string;
    isComplete: boolean;
    onToggle: () => void;
    onEdit: (task: string) => void;
    onDelete: () => void;
}

export const Todo: React.FC<TodoProps> = ({
    task,
    isComplete,
    onToggle,
    onEdit,
    onDelete,
}) => {
    const [value, setValue] = useState('');
    const [isFocused, setFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onEdit(event.target.value);
    };

    const handleSubmit = (value: string) => {
        setFocused(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit(value);
        } else if (event.key === 'Escape') {
            setFocused(false);
        }
    };

    return (
        <li className={cx('todo', { isFocused })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={isComplete}
                onToggle={onToggle}
            />
            <TextField
                value={Boolean(value) ? value : task}
                className={cx('text', { isComplete })}
                onChange={handleChange}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onKeyDown={handleKeyDown}
            />
            <span className={cx('delete')} onClick={onDelete}>
                X
            </span>
        </li>
    );
};
