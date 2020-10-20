import React, { useState, useRef } from 'react';
import cl from 'classnames/bind';

import styles from './TextField.module.css';

const cx = cl.bind(styles);

interface TextFieldProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    onBlur?: (event: React.SyntheticEvent) => void;
    onFocus?: (event: React.SyntheticEvent) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?: () => void;
}

export const TextField: React.FC<TextFieldProps> = ({
    className,
    value = '',
    placeholder = '',
    active = false,
    onBlur,
    onFocus,
    onChange,
    onTouchMove,
    onKeyDown,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = (event: React.SyntheticEvent) => {
        inputRef.current?.focus?.();
        onFocus?.(event);
    };

    const handleBlur = (event: React.SyntheticEvent) => {
        onBlur?.(event);
    };

    return (
        <input
            className={cx('input', className)}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onTouchMove={onTouchMove}
        />
    );
};
