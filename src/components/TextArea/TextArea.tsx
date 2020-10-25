import React, { forwardRef, useRef } from 'react';
import cl from 'classnames/bind';

import styles from './TextArea.module.css';

const cx = cl.bind(styles);

interface TextAreaProps {
    className?: string;
    value: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?: () => void;
    ref?: React.RefObject<HTMLTextAreaElement>;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        const inputRef = useRef<HTMLTextAreaElement>(null);

        const handleFocus = () => {
            inputRef.current?.focus?.();
            onFocus?.();
        };

        const handleBlur = () => {
            onBlur?.();
        };

        return (
            <textarea
                ref={ref}
                // rows={1}
                className={cx('textarea', className)}
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
