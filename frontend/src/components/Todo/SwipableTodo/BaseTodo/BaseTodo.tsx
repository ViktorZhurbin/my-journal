import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '../../../Checkbox';
import { TextField } from '../../../TextField';

import styles from './BaseTodo.module.css';

const cx = classNames.bind(styles);

interface BaseTodoProps {
    text: string;
    isComplete: boolean;
    onToggle: () => void;
    onEdit: (text: string) => void;
    onDelete: () => void;
}

export const BaseTodo: React.FC<BaseTodoProps> = ({
    text,
    isComplete,
    onToggle,
    onEdit,
    onDelete,
}) => {
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onEdit(event.target.value);
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
                onToggle={onToggle}
            />
            <TextField
                ref={inputRef}
                value={text}
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
