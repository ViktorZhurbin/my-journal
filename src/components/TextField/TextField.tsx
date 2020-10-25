import React, { forwardRef } from 'react';
import cl from 'classnames/bind';

import styles from './TextField.module.css';

const cx = cl.bind(styles);

interface TextFieldProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?: () => void;
    ref?: React.RefObject<HTMLInputElement>;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            className,
            value = '',
            placeholder = '',
            onBlur,
            onFocus,
            onChange,
            onTouchMove,
            onKeyDown,
        },
        ref
    ) => {
        return (
            <input
                ref={ref}
                className={cx('input', className)}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
                onTouchMove={onTouchMove}
            />
        );
    }
);

TextField.displayName = 'TextField';
