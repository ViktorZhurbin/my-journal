import React, { forwardRef } from 'react';
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
    onChange?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
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
        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            const value = event.target.value.replace(/\r?\n|\r/, '');
            onChange(value);
        };

        return (
            <div className={cx('parent', className)} data-value={value.trim()}>
                <textarea
                    ref={ref}
                    className={cx('textarea')}
                    rows={1}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onTouchMove={onTouchMove}
                />
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
