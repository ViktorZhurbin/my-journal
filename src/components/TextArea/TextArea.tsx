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
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
        return (
            <div className={cx('parent', className)} data-value={value.trim()}>
                <textarea
                    ref={ref}
                    className={cx('textarea')}
                    rows={1}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
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
