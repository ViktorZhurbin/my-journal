import React, { forwardRef, useRef } from 'react';
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
        const inputRef = useRef<HTMLInputElement>(null);

        const handleFocus = () => {
            inputRef.current?.focus?.();
            onFocus?.();
        };

        const handleBlur = () => {
            onBlur?.();
        };

        return (
            <input
                ref={ref}
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
    }
);
