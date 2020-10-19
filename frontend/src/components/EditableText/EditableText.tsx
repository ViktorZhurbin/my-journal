import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './EditableText.module.css';

const cx = classNames.bind(styles);

interface EditableTextProps {
    text: string;
    classNames?: string;
    onSubmit: (value: string) => void;
    onCancel: () => void;
    onStart: () => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
    text,
    onStart,
    onSubmit,
    onCancel,
    classNames,
}) => {
    const [value, setValue] = useState(text);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = (event: React.SyntheticEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = () => {
        if (Boolean(value) && value !== text) {
            onSubmit(value);
        }
        inputRef?.current?.blur();
        onCancel();
    };

    const handleCancel = () => {
        setValue(text);
        onCancel();
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <input
            ref={inputRef}
            className={cx('text', classNames)}
            value={value}
            onChange={handleChange}
            onBlur={handleSubmit}
            onClick={onStart}
            onSubmit={handleSubmit}
            onKeyDown={onKeyDown}
        />
    );
};
